/**
 * Multi-LLM Service Orchestrator for AI Hive Mind
 * Dispatches prompts to real API providers (OpenAI, Gemini, Claude, Groq, Ollama)
 * Providers without credentials fall back to a clearly flagged demo simulation;
 * configured providers that fail report an error instead of fake output.
 */

const SECRET_PATTERNS = [/sk-[A-Za-z0-9_*-]{6,}/g, /gsk_[A-Za-z0-9_*]{6,}/g, /AIza[A-Za-z0-9_-]{10,}/g];

function providerError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

/**
 * Maps a provider/network failure to a stable error type the UI can explain.
 */
export function classifyProviderError(err) {
  const status = err?.status;
  const msg = String(err?.message || '').toLowerCase();
  if (err?.name === 'TimeoutError' || err?.name === 'AbortError' || msg.includes('timed out')) return 'timeout';
  if (status === 401 || status === 403) return 'auth';
  if (status === 402 || /quota|insufficient|billing|credit/.test(msg)) return 'quota';
  if (status === 429) return 'rate_limit';
  if (status === 404 || /model .*(not found|does not exist)|invalid model|unknown model/.test(msg)) return 'invalid_model';
  if (!status && (msg.includes('fetch failed') || ['ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET', 'ETIMEDOUT'].includes(err?.cause?.code))) return 'network';
  return 'provider_error';
}

const ERROR_HINTS = {
  timeout: 'The provider did not answer in time.',
  auth: 'The provider rejected the API key.',
  quota: 'The provider account has no remaining quota or credit.',
  rate_limit: 'The provider is rate-limiting requests; try again shortly.',
  invalid_model: 'The provider does not recognise the configured model id.',
  network: 'Could not reach the provider.',
  provider_error: 'The provider returned an error.'
};

export class LLMService {
  constructor(apiKeys = {}) {
    this.apiKeys = apiKeys; // { openai, gemini, anthropic, groq, ollamaUrl }
    this.timeoutMs = Number(process.env.GENERATION_TIMEOUT_MS) || 120000;
  }

  /**
   * Removes configured key values and key-shaped tokens from text that may be shown or logged.
   */
  redactSecrets(text) {
    let out = String(text || '');
    for (const [name, value] of Object.entries(this.apiKeys)) {
      if (name !== 'ollamaUrl' && typeof value === 'string' && value.length >= 6) {
        out = out.split(value).join('[redacted]');
      }
    }
    for (const pattern of SECRET_PATTERNS) out = out.replace(pattern, '[redacted]');
    return out;
  }

  updateKeys(newKeys) {
    this.apiKeys = { ...this.apiKeys, ...newKeys };
  }

  async testConnection(modelId) {
    const startTime = Date.now();
    try {
      if (modelId === 'sarvam-105b') {
        if (!this.apiKeys.sarvam) return { status: 'unconfigured', message: 'Sarvam AI key not configured' };
        const res = await fetch('https://api.sarvam.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': this.apiKeys.sarvam
          },
          body: JSON.stringify({
            model: 'sarvam-105b',
            messages: [{ role: 'user', content: 'ping' }],
            max_tokens: 5
          })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { status: 'connected', latency: Date.now() - startTime, message: 'Connected to Sarvam AI (105B Indic Model)' };
      }

      if (modelId === 'gpt-4o') {
        if (!this.apiKeys.openai) return { status: 'unconfigured', message: 'OpenAI API key not configured' };
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { Authorization: `Bearer ${this.apiKeys.openai}` }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { status: 'connected', latency: Date.now() - startTime, message: 'Connected to OpenAI' };
      }

      if (modelId === 'gemini-2-5-flash') {
        if (!this.apiKeys.gemini) return { status: 'unconfigured', message: 'Gemini API key not configured' };
        const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
          headers: { 'x-goog-api-key': this.apiKeys.gemini }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { status: 'connected', latency: Date.now() - startTime, message: 'Connected to Google Gemini' };
      }

      if (modelId === 'claude-opus-5-5') {
        if (!this.apiKeys.anthropic) return { status: 'unconfigured', message: 'Anthropic API key not configured' };
        return { status: 'configured', latency: Date.now() - startTime, message: 'Key saved (ready for Anthropic calls)' };
      }

      if (modelId === 'llama-3-3-70b') {
        if (!this.apiKeys.groq) return { status: 'unconfigured', message: 'Groq API key not configured' };
        const res = await fetch('https://api.groq.com/openai/v1/models', {
          headers: { Authorization: `Bearer ${this.apiKeys.groq}` }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { status: 'connected', latency: Date.now() - startTime, message: 'Connected to Groq Cloud' };
      }

      if (modelId === 'ollama-local') {
        const url = this.apiKeys.ollamaUrl || 'http://127.0.0.1:11434';
        const res = await fetch(`${url}/api/tags`, { signal: AbortSignal.timeout(3000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { status: 'connected', latency: Date.now() - startTime, message: 'Connected to Ollama Local' };
      }

      return { status: 'ready', latency: 45, message: 'Simulation / Demo Engine Ready' };
    } catch (err) {
      return { status: 'error', latency: Date.now() - startTime, message: err.message || 'Connection failed' };
    }
  }

  async generateSingle(model, prompt, conversationContext = [], documentContext = '') {
    const startTime = Date.now();
    let fullPrompt = prompt;
    if (documentContext) {
      fullPrompt = `[Referenced Document Context]:\n${documentContext}\n\n[User Instruction]:\n${prompt}`;
    }

    const meta = { modelId: model.id, modelName: model.name, provider: model.provider, avatar: model.avatar, badgeColor: model.badgeColor };
    const emptyUsage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };

    // A configured provider either answers live or reports its error; it never silently falls back
    const liveCall = this.getLiveCall(model.id);
    if (liveCall) {
      try {
        const result = await liveCall(fullPrompt, conversationContext);
        // A blank reply (e.g. a reasoning model that spent its budget thinking) is not an answer
        if (!String(result?.text || '').trim()) {
          throw new Error('The model returned an empty answer.');
        }
        return { ...result, ...meta, latency: Date.now() - startTime, isLive: true, isSimulated: false };
      } catch (err) {
        const errorType = classifyProviderError(err);
        const detail = this.redactSecrets(err.message || 'API call was unable to complete.');
        const message = `${ERROR_HINTS[errorType]} (${detail})`;
        console.warn(`[LLMService] Live call for ${model.id} failed [${errorType}]: ${detail}`);
        return {
          ...meta,
          status: 'error',
          errorType,
          errorMessage: message,
          text: `[Error from ${model.name}: ${message}]`,
          tokenUsage: emptyUsage,
          latency: Date.now() - startTime,
          isLive: false,
          isSimulated: false
        };
      }
    }

    if (process.env.ALLOW_SIMULATION === 'false') {
      const message = `No API key configured for ${model.provider}. Add one in Settings.`;
      return {
        ...meta,
        status: 'error',
        errorMessage: message,
        text: `[Error from ${model.name}: ${message}]`,
        tokenUsage: emptyUsage,
        latency: 0,
        isLive: false,
        isSimulated: false
      };
    }

    // Demo simulation for providers without credentials (flagged so the UI and critic can tell)
    const simulated = await this.simulateModelResponse(model, prompt, conversationContext);
    const latency = Math.round(model.latencyAvg * (0.8 + Math.random() * 0.4));
    await new Promise(r => setTimeout(r, Math.min(latency, 1200))); // natural async delay

    return {
      ...meta,
      text: simulated.text,
      tokenUsage: simulated.tokenUsage,
      latency: Date.now() - startTime,
      isLive: false,
      isSimulated: true,
      status: 'success'
    };
  }

  /**
   * Returns the live API call for a model, or null when its provider has no credentials.
   */
  getLiveCall(modelId) {
    const k = this.apiKeys;
    const calls = {
      'sarvam-105b': k.sarvam && ((p, c) => this.callSarvam(p, c)),
      'gpt-4o': k.openai && ((p, c) => this.callOpenAI(p, c)),
      'gemini-2-5-flash': k.gemini && ((p, c) => this.callGemini(p, c)),
      'llama-3-3-70b': k.groq && ((p, c) => this.callGroq(p, c)),
      'claude-opus-5-5': k.anthropic && ((p, c) => this.callAnthropic(p, c)),
      'ollama-local': (p, c) => this.callOllama(p, c)
    };
    return calls[modelId] || null;
  }

  /**
   * True when a model can be answered by its real provider (Ollama counts once a URL is set).
   */
  hasCredentials(modelId) {
    if (modelId === 'ollama-local') return Boolean(this.apiKeys.ollamaUrl);
    return Boolean(this.getLiveCall(modelId));
  }

  async generateParallel(selectedModels, prompt, conversationContext = [], documentContext = '') {
    const promises = selectedModels.map(model => 
      this.generateSingle(model, prompt, conversationContext, documentContext)
        .catch(err => ({
          modelId: model.id,
          modelName: model.name,
          provider: model.provider,
          avatar: model.avatar,
          badgeColor: model.badgeColor,
          status: 'error',
          errorMessage: err.message || 'Generation failed',
          text: `[Error from ${model.name}: ${err.message || 'API call was unable to complete.'}]`,
          latency: 0,
          tokenUsage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
          isLive: false
        }))
    );

    const results = await Promise.all(promises);
    return results;
  }

  // --- Real API Implementations ---

  async callSarvam(prompt, context) {
    const messages = context.map(m => ({ role: m.role, content: m.text || m.content }));
    messages.push({ role: 'user', content: prompt });

    const res = await fetch('https://api.sarvam.ai/v1/chat/completions', {
      method: 'POST',
      signal: AbortSignal.timeout(this.timeoutMs),
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': this.apiKeys.sarvam
      },
      body: JSON.stringify({
        model: 'sarvam-105b',
        messages,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw providerError(res.status, err.error?.message || `Sarvam AI error ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.choices[0]?.message?.content || '',
      tokenUsage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      },
      status: 'success'
    };
  }

  async callOpenAI(prompt, context) {
    const messages = context.map(m => ({ role: m.role, content: m.text || m.content }));
    messages.push({ role: 'user', content: prompt });

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: AbortSignal.timeout(this.timeoutMs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKeys.openai}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o',
        messages,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw providerError(res.status, err.error?.message || `OpenAI error ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.choices[0]?.message?.content || '',
      tokenUsage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      },
      status: 'success'
    };
  }

  async callGemini(prompt, context) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    const contents = context.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text || m.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const res = await fetch(url, {
      method: 'POST',
      signal: AbortSignal.timeout(this.timeoutMs),
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': this.apiKeys.gemini },
      body: JSON.stringify({ contents })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw providerError(res.status, err.error?.message || `Gemini error ${res.status}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.map(p => p.text).join('') || '';
    const meta = data.usageMetadata || {};

    return {
      text,
      tokenUsage: {
        promptTokens: meta.promptTokenCount || 0,
        completionTokens: meta.candidatesTokenCount || 0,
        totalTokens: meta.totalTokenCount || 0
      },
      status: 'success'
    };
  }

  async callGroq(prompt, context) {
    const messages = context.map(m => ({ role: m.role, content: m.text || m.content }));
    messages.push({ role: 'user', content: prompt });

    // Use available chat model on Groq
    const model = 'openai/gpt-oss-120b';

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: AbortSignal.timeout(this.timeoutMs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKeys.groq}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw providerError(res.status, err.error?.message || `Groq error ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.choices[0]?.message?.content || '',
      tokenUsage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      },
      status: 'success'
    };
  }

  async callAnthropic(prompt, context) {
    const messages = context.map(m => ({ role: m.role, content: m.text || m.content }));
    messages.push({ role: 'user', content: prompt });

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: AbortSignal.timeout(this.timeoutMs),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKeys.anthropic,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'server-side-fallback-2026-07-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-5-5',
        max_tokens: 16000,
        fallbacks: 'default',
        messages
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw providerError(res.status, err.error?.message || `Anthropic error ${res.status}`);
    }

    const data = await res.json();
    if (data.stop_reason === 'refusal') {
      throw new Error(`Claude declined the request${data.stop_details?.category ? ` (${data.stop_details.category})` : ''}`);
    }
    // Content may start with thinking blocks; keep only the text blocks
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    return {
      text,
      tokenUsage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)
      },
      status: 'success'
    };
  }

  async callOllama(prompt, context) {
    const url = (this.apiKeys.ollamaUrl || 'http://127.0.0.1:11434') + '/api/chat';
    const messages = context.map(m => ({ role: m.role, content: m.text || m.content }));
    messages.push({ role: 'user', content: prompt });

    const res = await fetch(url, {
      method: 'POST',
      signal: AbortSignal.timeout(this.timeoutMs),
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        messages,
        stream: false
      })
    });

    if (!res.ok) throw providerError(res.status, `Ollama responded with HTTP ${res.status}`);
    const data = await res.json();
    return {
      text: data.message?.content || '',
      tokenUsage: {
        promptTokens: data.prompt_eval_count || 50,
        completionTokens: data.eval_count || 150,
        totalTokens: (data.prompt_eval_count || 50) + (data.eval_count || 150)
      },
      status: 'success'
    };
  }

  // --- High-Fidelity Simulation / Academic Engine ---
  async simulateModelResponse(model, prompt, context) {
    const lower = prompt.toLowerCase();
    let text = '';

    // Check if this is a follow-up about beginner optimization
    const isFollowUpOptimize = /\b(optimize|beginner|simplify|simpler|explain easier)\b/i.test(lower) && context.length > 0;

    // 1. C Prime Program
    if (/\b(c program|c language|in c\b|#include)\b/i.test(lower) && /\bprime\b/i.test(lower)) {
      if (model.id === 'claude-opus-5-5') {
        text = `### Prime Number Verification in C (Optimized Approach)

Here is a complete, robust, and well-structured C program to check whether a given number is prime.

\`\`\`c
#include <stdio.h>
#include <stdbool.h>
#include <math.h>

/**
 * Checks if a number is prime.
 * Time Complexity: O(sqrt(n))
 * Space Complexity: O(1)
 */
bool isPrime(int n) {
    // 0, 1, and negative numbers are not prime
    if (n <= 1) return false;
    
    // 2 and 3 are prime
    if (n <= 3) return true;
    
    // Eliminate multiples of 2 and 3 early
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    // Test factors using the 6k ± 1 pattern up to sqrt(n)
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int number;
    
    printf("=========================================\n");
    printf("   Prime Number Checker (C Language)     \n");
    printf("=========================================\n");
    printf("Enter an integer to evaluate: ");
    
    if (scanf("%d", &number) != 1) {
        printf("Error: Invalid input. Please enter a valid integer.\n");
        return 1;
    }
    
    if (isPrime(number)) {
        printf("Result: %d is a PRIME number.\n", number);
    } else {
        printf("Result: %d is NOT a prime number (composite or <= 1).\n", number);
    }
    
    return 0;
}
\`\`\`

#### Key Mathematical & Algorithmic Logic:
1. **Definition of Prime**: An integer greater than 1 with no positive divisors other than 1 and itself.
2. **Eliminating Even Numbers & Factors of 3**: Checks \`n % 2 == 0\` and \`n % 3 == 0\` in $O(1)$ time.
3. **Square Root Limit ($O(\\sqrt{n})$)**: If $n = a \\times b$, at least one factor must be $\\le \\sqrt{n}$.
4. **6k ± 1 Optimization**: All primes greater than 3 can be expressed in the form $6k \\pm 1$, skipping all other composite candidates.`;
      } else if (model.id === 'gpt-4o') {
        text = `### C Program to Check if a Number is Prime

Below is a clean and efficient C program that verifies prime numbers with complete boundary validation.

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

// Function to check prime status
bool checkPrime(int n) {
    if (n <= 1) {
        return false; // Numbers <= 1 are not prime
    }
    
    // Check divisibility from 2 up to sqrt(n)
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false; // Found a divisor
        }
    }
    
    return true; // No divisors found, number is prime
}

int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);

    if (checkPrime(num)) {
        printf("%d is a Prime Number.\n", num);
    } else {
        printf("%d is NOT a Prime Number.\n", num);
    }

    return 0;
}
\`\`\`

#### Step-by-Step Explanation:
- **Base Conditions**: Any number $\\le 1$ is immediately flagged as not prime.
- **Divisibility Loop**: Instead of iterating up to $n-1$, checking up to \`i * i <= n\` achieves an optimal $O(\\sqrt{n})$ runtime without floating-point rounding errors.
- **Sample Run**:
  - Input \`29\` $\\rightarrow$ Output: \`29 is a Prime Number.\`
  - Input \`15\` $\\rightarrow$ Output: \`15 is NOT a Prime Number.\``;
      } else {
        text = `### C Prime Number Solution

\`\`\`c
#include <stdio.h>

int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main() {
    int n;
    printf("Enter number: ");
    scanf("%d", &n);
    if (isPrime(n)) {
        printf("%d is prime\\n", n);
    } else {
        printf("%d is not prime\\n", n);
    }
    return 0;
}
\`\`\`
**Explanation**: Checks factors up to $\\sqrt{n}$ with $O(\\sqrt{n})$ time complexity.`;
      }
    } else if (isFollowUpOptimize) {
      // Follow-up beginner optimization
      text = `### Beginner-Friendly Optimized Version

Building upon the previous prime number solution, here is a simplified version formatted specifically for students and beginners:

\`\`\`c
#include <stdio.h>

// Step 1: Create a simple function that returns 1 for Prime, 0 for Not Prime
int isPrimeBeginner(int number) {
    // Rule 1: Numbers less than or equal to 1 are never prime
    if (number <= 1) {
        return 0;
    }

    // Rule 2: 2 is the only even prime number
    if (number == 2) {
        return 1;
    }

    // Rule 3: Any other even number is not prime
    if (number % 2 == 0) {
        return 0;
    }

    // Rule 4: Test only odd divisors (3, 5, 7, 9...) up to the square root
    for (int divisor = 3; divisor * divisor <= number; divisor += 2) {
        if (number % divisor == 0) {
            return 0; // Found a factor, so it is not prime
        }
    }

    return 1; // Passed all checks!
}

int main() {
    int testNum = 17;
    
    printf("Testing number: %d\n", testNum);
    if (isPrimeBeginner(testNum)) {
        printf("%d is PRIME! (Clean and simple logic)\n", testNum);
    } else {
        printf("%d is NOT prime.\n", testNum);
    }

    return 0;
}
\`\`\`

#### Why this is great for beginners:
1. **No complex math macros**: Uses straightforward \`if\` conditions.
2. **Skips 50% of calculations**: By skipping even numbers, the loop only tests odd divisors (\`divisor += 2\`).
3. **Readable Variable Names**: Uses \`number\` and \`divisor\` instead of cryptic letters.`;
    } else if (/\bpython\b/i.test(lower) && /\bprime\b/i.test(lower)) {
      text = `### Python Prime Number Checker

\`\`\`python
import math

def is_prime(n: int) -> bool:
    """
    Determines whether an integer n is prime.
    Complexity: O(sqrt(n))
    """
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
        
    # Check odd divisors up to sqrt(n)
    limit = int(math.isqrt(n))
    for i in range(3, limit + 1, 2):
        if n % i == 0:
            return False
            
    return True

# Example verification
test_cases = [1, 2, 17, 25, 97, -7]
for num in test_cases:
    print(f"{num:3d} -> Prime: {is_prime(num)}")
\`\`\`

#### Logic Summary:
- **Negative & 0, 1**: Filtered out in $O(1)$.
- **\`math.isqrt(n)\`**: Efficient integer square root avoids float imprecision.
- **Odd-step loop**: Reduces tested divisors by half.`;
    } else {
      // General comprehensive response
      text = `### ${model.name} Response

Here is a structured, in-depth solution addressing your request:

1. **Overview & Analysis**:
   - The core objective is addressed systematically with clean logic and verifiable steps.
   - Built with best practices and error resilience in mind.

2. **Core Implementation**:
\`\`\`text
[Structured Solution for: "${prompt.substring(0, 60)}..."]
- Standardized conventions applied
- Input validation and boundary safety verified
- Explicit trade-offs and complexity considered
\`\`\`

3. **Key Takeaways & Summary**:
   - Ensures clarity, high performance, and structured readability.
   - Ready for immediate integration or follow-up elaboration.`;
    }

    const words = text.split(/\s+/).length;
    const promptTokens = Math.round(prompt.split(/\s+/).length * 1.3);
    const completionTokens = Math.round(words * 1.3);

    return {
      text,
      tokenUsage: {
        promptTokens,
        completionTokens,
        totalTokens: promptTokens + completionTokens
      }
    };
  }
}

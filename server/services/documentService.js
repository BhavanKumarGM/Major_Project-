/**
 * Document Processing Service for AI Hive Mind
 * Extracts clean text from PDF, DOCX, and plain-text files, and creates context chunks.
 */

// Import the library entry directly: pdf-parse's index runs a debug self-test on import
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';

const TEXT_EXTENSIONS = ['txt', 'md', 'markdown', 'json', 'csv', 'log'];

export async function parseDocument(fileBuffer, mimeType, originalName) {
  try {
    const ext = originalName.includes('.') ? originalName.split('.').pop().toLowerCase() : '';
    let text = '';

    if (ext === 'pdf' || mimeType === 'application/pdf') {
      const result = await pdfParse(fileBuffer);
      text = result.text;
    } else if (ext === 'docx' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      text = result.value;
    } else if (TEXT_EXTENSIONS.includes(ext) || (mimeType || '').startsWith('text/')) {
      text = fileBuffer.toString('utf-8');
    } else {
      throw new Error(`Unsupported file type ".${ext || 'unknown'}". Upload PDF, DOCX, TXT, MD or JSON.`);
    }

    text = text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    if (!text) {
      throw new Error('No extractable text found (scanned PDFs need OCR first).');
    }

    // Chunking
    const chunks = chunkText(text, 1200);

    return {
      filename: originalName,
      fileType: ext,
      charCount: text.length,
      wordCount: text.split(/\s+/).filter(Boolean).length,
      chunksCount: chunks.length,
      preview: text.substring(0, 300) + (text.length > 300 ? '...' : ''),
      fullText: text
    };
  } catch (err) {
    throw new Error(`Failed to parse document ${originalName}: ${err.message}`);
  }
}

function chunkText(text, chunkSize = 1200) {
  const paragraphs = text.split(/\n\s*\n/);
  const chunks = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + '\n\n' + para).length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk = currentChunk ? `${currentChunk}\n\n${para}` : para;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

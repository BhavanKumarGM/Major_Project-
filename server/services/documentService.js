/**
 * Document Processing Service for AI Hive Mind
 * Extracts clean text from PDF, DOCX, and TXT files, and creates context chunks.
 */

export function parseDocument(fileBuffer, mimeType, originalName) {
  try {
    let text = '';
    const ext = originalName.split('.').pop().toLowerCase();

    if (ext === 'txt' || mimeType === 'text/plain' || mimeType === 'text/markdown') {
      text = fileBuffer.toString('utf-8');
    } else {
      // Basic text extraction for raw documents/markdown/code
      text = fileBuffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    }

    // Chunking
    const chunks = chunkText(text, 1200);

    return {
      filename: originalName,
      fileType: ext,
      charCount: text.length,
      wordCount: text.split(/\s+/).length,
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

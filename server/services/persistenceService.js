/**
 * JSON File Persistence for AI Hive Mind
 * Stores small state documents (conversations, analytics, settings) under DATA_DIR
 * so they survive server restarts. Writes are atomic (temp file + rename).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve(here, '..', 'data');

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function loadState(name, fallback) {
  try {
    const raw = fs.readFileSync(filePath(name), 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn(`[Persistence] Could not read ${name}.json (${err.message}); starting fresh.`);
    }
    return fallback;
  }
}

export function saveState(name, data) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const target = filePath(name);
    const tmp = `${target}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), { encoding: 'utf-8', mode: 0o600 });
    fs.renameSync(tmp, target);
  } catch (err) {
    console.error(`[Persistence] Failed to write ${name}.json: ${err.message}`);
  }
}

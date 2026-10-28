// Loaded before every test file (see "test" script) so no test writes into server/data
import fs from 'fs';
import os from 'os';
import path from 'path';

if (!process.env.DATA_DIR) {
  process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'hive-tests-'));
}

// Judge retries wait 1.5 s in production; tests exercise the retry path without the wait
process.env.JUDGE_RETRY_DELAY_MS ??= '0';

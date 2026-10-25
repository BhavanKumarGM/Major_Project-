// Loaded before every test file (see "test" script) so no test writes into server/data
import fs from 'fs';
import os from 'os';
import path from 'path';

if (!process.env.DATA_DIR) {
  process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'hive-tests-'));
}

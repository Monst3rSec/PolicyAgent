import { chmodSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const binPath = join(process.cwd(), 'dist', 'index.js');

if (process.platform !== 'win32' && existsSync(binPath)) {
  chmodSync(binPath, 0o755);
}


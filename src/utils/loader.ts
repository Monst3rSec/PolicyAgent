import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import yaml from 'js-yaml';
import type { PolicyAgentManifest } from './manifest.js';

export function loadManifest(dir: string): PolicyAgentManifest {
  const manifestPath = join(resolve(dir), 'policyagent.yaml');
  if (!existsSync(manifestPath)) {
    throw new Error(`policyagent.yaml not found in ${resolve(dir)}`);
  }

  const content = readFileSync(manifestPath, 'utf-8');
  return yaml.load(content) as PolicyAgentManifest;
}

export function readFileIfExists(path: string): string | null {
  if (!existsSync(path)) {
    return null;
  }

  return readFileSync(path, 'utf-8');
}


import { existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { loadManifest, readFileIfExists } from './loader.js';
import type { PolicyAgentManifest } from './manifest.js';

export interface RepoSectionSummary {
  path: string;
  exists: boolean;
  fileCount: number;
  files: string[];
}

export interface RepoGitSummary {
  isRepo: boolean;
  branch: string | null;
  latestCommit: string | null;
  remotes: string[];
  tags: string[];
}

export interface PolicyRepoDetails {
  root: string;
  manifest: PolicyAgentManifest | null;
  purposePreview: string | null;
  rulesPreview: string | null;
  governancePreview: string | null;
  sections: RepoSectionSummary[];
  git: RepoGitSummary;
}

const SECTION_NAMES = [
  'policies',
  'controls',
  'standards',
  'procedures',
  'knowledge',
  'evidence',
  'workflows',
  'agents'
] as const;

function listFiles(dir: string): string[] {
  if (!existsSync(dir)) {
    return [];
  }

  const results: string[] = [];
  const stack = [dir];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    const entries = readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else {
        results.push(fullPath);
      }
    }
  }

  return results.sort();
}

function previewMarkdown(path: string): string | null {
  const content = readFileIfExists(path);
  if (!content) {
    return null;
  }

  const cleaned = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));

  return cleaned[0] ?? null;
}

function summarizeSections(root: string): RepoSectionSummary[] {
  return SECTION_NAMES.map((name) => {
    const sectionPath = join(root, name);
    const files = listFiles(sectionPath).map((file) => file.replace(`${root}/`, ''));

    return {
      path: name,
      exists: existsSync(sectionPath),
      fileCount: files.length,
      files: files.slice(0, 20)
    };
  });
}

function tryGit(root: string, args: string[]): string | null {
  try {
    return execFileSync('git', ['-C', root, ...args], {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    }).trim();
  } catch {
    return null;
  }
}

function summarizeGit(root: string): RepoGitSummary {
  const isRepo = tryGit(root, ['rev-parse', '--is-inside-work-tree']) === 'true';
  if (!isRepo) {
    return {
      isRepo: false,
      branch: null,
      latestCommit: null,
      remotes: [],
      tags: []
    };
  }

  const remotesOutput = tryGit(root, ['remote', '-v']) ?? '';
  const tagsOutput = tryGit(root, ['tag', '--sort=-creatordate']) ?? '';

  return {
    isRepo: true,
    branch: tryGit(root, ['branch', '--show-current']),
    latestCommit: tryGit(root, ['log', '-1', '--pretty=format:%h %s']),
    remotes: remotesOutput === '' ? [] : Array.from(new Set(remotesOutput.split('\n'))),
    tags: tagsOutput === '' ? [] : tagsOutput.split('\n').slice(0, 10)
  };
}

export function getRepoDetails(dir: string): PolicyRepoDetails {
  const root = resolve(dir);
  let manifest: PolicyAgentManifest | null = null;

  try {
    manifest = loadManifest(root);
  } catch {
    manifest = null;
  }

  return {
    root,
    manifest,
    purposePreview: previewMarkdown(join(root, 'PURPOSE.md')),
    rulesPreview: previewMarkdown(join(root, 'RULES.md')),
    governancePreview: previewMarkdown(join(root, 'GOVERNANCE.md')),
    sections: summarizeSections(root),
    git: summarizeGit(root)
  };
}


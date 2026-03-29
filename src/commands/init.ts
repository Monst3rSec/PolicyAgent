import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { Command } from 'commander';

interface InitOptions {
  template: string;
  dir: string;
  owner: string;
  reviewer: string;
}

const DEFAULT_OWNER = '@your-org/policy-admins';
const DEFAULT_REVIEWER = '@your-org/policy-reviewers';

function createDir(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function createFile(path: string, content: string): void {
  writeFileSync(path, content, 'utf-8');
}

function manifestTemplate(owner: string, reviewer: string): string {
  return `spec_version: "0.1.0"
name: my-policy-repo
version: 1.0.0
description: Repository for company policies, standards, procedures, and mappings
owners:
  - ${owner}
reviewers:
  - ${reviewer}
adapters:
  default: generic
  enabled:
    - generic
policy_paths:
  - policies
  - standards
  - procedures
control_frameworks:
  - internal
`;
}

function purposeTemplate(): string {
  return `# Purpose

This repository is the source of truth for policy documents, supporting standards, operating procedures, and governance evidence.

All policy changes should be proposed through pull requests and reviewed before merge.
`;
}

function rulesTemplate(): string {
  return `# Rules

## Must Always

- treat repository files as the source of truth
- prefer citations to repository content
- keep policy drafts reviewable and traceable

## Must Never

- mark drafted content as approved before review
- invent policy ownership or approval status
- bypass the repository workflow for final policy state
`;
}

function governanceTemplate(): string {
  return `# Governance

- Policy changes must be proposed through pull requests.
- The \`main\` branch is the approved baseline.
- CODEOWNERS controls reviewer assignment.
- Branch protection should require review and passing CI.
- Releases may be tagged after approval.
`;
}

function codeownersTemplate(owner: string, reviewer: string): string {
  return `# PolicyAgent CODEOWNERS
# Update these teams or users after scaffolding.

* ${owner}
/policies/ ${reviewer}
/standards/ ${reviewer}
/procedures/ ${reviewer}
/controls/ ${reviewer}
/knowledge/ ${owner}
/evidence/ ${owner}
/docs/ ${owner}
`;
}

function prTemplate(): string {
  return `## Summary

- What changed?
- Why is the change needed?

## Impacted Areas

- [ ] policies
- [ ] standards
- [ ] procedures
- [ ] controls
- [ ] knowledge
- [ ] evidence

## Review Checklist

- [ ] Repository structure still matches PolicyAgent expectations
- [ ] Policy wording is clear and reviewable
- [ ] Mappings were updated if needed
- [ ] Supporting docs were updated if needed
- [ ] This change is ready for reviewer approval
`;
}

function samplePolicyTemplate(): string {
  return `# Example Policy

## Purpose

Describe why this policy exists.

## Scope

Describe who and what is covered.

## Policy Statement

Describe the required behavior.
`;
}

function workflowTemplate(): string {
  return `name: draft-policy
description: Draft a new policy and route it through pull request review
steps:
  - collect_context
  - generate_draft
  - save_to_repo
  - open_pull_request
`;
}

export const initCommand = new Command('init')
  .description('Scaffold a new PolicyAgent policy repository')
  .option('-t, --template <template>', 'Template to use', 'minimal')
  .option('-d, --dir <dir>', 'Target directory', '.')
  .option('--owner <owner>', 'Default CODEOWNERS owner', DEFAULT_OWNER)
  .option('--reviewer <reviewer>', 'Default policy reviewer', DEFAULT_REVIEWER)
  .action((options: InitOptions) => {
    const dir = resolve(options.dir);

    if (existsSync(join(dir, 'policyagent.yaml'))) {
      console.error(`policyagent.yaml already exists in ${dir}`);
      process.exit(1);
    }

    createDir(dir);
    createDir(join(dir, '.github'));
    createDir(join(dir, 'policies'));
    createDir(join(dir, 'controls'));
    createDir(join(dir, 'standards'));
    createDir(join(dir, 'procedures'));
    createDir(join(dir, 'knowledge'));
    createDir(join(dir, 'evidence'));
    createDir(join(dir, 'workflows'));
    createDir(join(dir, 'agents'));

    createFile(join(dir, 'policyagent.yaml'), manifestTemplate(options.owner, options.reviewer));
    createFile(join(dir, 'PURPOSE.md'), purposeTemplate());
    createFile(join(dir, 'RULES.md'), rulesTemplate());
    createFile(join(dir, 'GOVERNANCE.md'), governanceTemplate());
    createFile(join(dir, '.github', 'CODEOWNERS'), codeownersTemplate(options.owner, options.reviewer));
    createFile(join(dir, '.github', 'pull_request_template.md'), prTemplate());
    createFile(join(dir, 'policies', 'example-policy.md'), samplePolicyTemplate());
    createFile(join(dir, 'workflows', 'draft-policy.yaml'), workflowTemplate());

    if (options.template === 'standard') {
      createFile(join(dir, 'standards', 'example-standard.md'), '# Example Standard\n\nAdd a mandatory implementation standard here.\n');
      createFile(join(dir, 'procedures', 'example-procedure.md'), '# Example Procedure\n\nAdd a step-by-step operational procedure here.\n');
      createFile(join(dir, 'controls', 'control-map.md'), '# Control Map\n\nMap policy content to frameworks or internal controls here.\n');
      createFile(join(dir, 'knowledge', 'faq.md'), '# FAQ\n\nAdd policy reference material here.\n');
      createFile(join(dir, 'evidence', 'approval-checklist.md'), '# Approval Checklist\n\nDocument approvals and release evidence here.\n');
    }

    console.log('PolicyAgent repository scaffolded successfully.');
    console.log(`directory: ${dir}`);
    console.log(`template: ${options.template}`);
    console.log(`owner: ${options.owner}`);
    console.log(`reviewer: ${options.reviewer}`);
    console.log('');
    console.log('Generated reviewer workflow files:');
    console.log('- .github/CODEOWNERS');
    console.log('- .github/pull_request_template.md');
    console.log('');
    console.log('Next steps:');
    console.log('1. Replace placeholder owners and reviewers');
    console.log('2. Enable branch protection on main');
    console.log('3. Run policyagent info -d .');
  });

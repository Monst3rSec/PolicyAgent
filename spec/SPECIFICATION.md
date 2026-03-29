# PolicyAgent Specification v0.1.0

## 1. Overview

PolicyAgent defines a portable, git-native structure for policy repositories.

The repository is the source of truth.

PolicyAgent helps users:

- author policy content
- explain policy content
- map policy content to controls and frameworks
- manage policy changes through Git workflows

## 2. Directory Structure

```text
my-policy-repo/
├── policyagent.yaml          # required manifest
├── PURPOSE.md                # required repo purpose and scope
├── RULES.md                  # optional PolicyAgent behavior and safety rules
├── GOVERNANCE.md             # optional local governance rules
├── .github/
│   ├── CODEOWNERS            # reviewer ownership rules created during init
│   └── pull_request_template.md
├── policies/                 # policy documents
├── controls/                 # control statements and mappings
├── standards/                # standards derived from policy
├── procedures/               # operating procedures
├── knowledge/                # reference documents used for explanation and Q&A
├── evidence/                 # release and approval evidence
├── workflows/                # drafting and review workflows
├── agents/                   # optional sub-agent definitions
└── .policyagent/             # runtime state, gitignored
```

## 3. Required Files

### policyagent.yaml

Required fields:

- `spec_version`
- `name`
- `version`
- `description`

Recommended fields:

- `owners`
- `reviewers`
- `adapters`
- `policy_paths`
- `control_frameworks`

Example:

```yaml
spec_version: "0.1.0"
name: security-policy-repo
version: 1.0.0
description: Repository for internal security policies and supporting controls
owners:
  - security-governance
reviewers:
  - risk-team
  - security-architecture
adapters:
  default: generic
  enabled:
    - generic
    - openai
    - anthropic
policy_paths:
  - policies
  - standards
  - procedures
control_frameworks:
  - iso-27001
  - soc2
```

### PURPOSE.md

This file explains:

- what the repository is for
- what policy domain it covers
- who uses it
- what is in scope and out of scope

### `.github/CODEOWNERS`

This file should be created during `policyagent init`.

Its purpose is to:

- automatically request reviewers for PRs
- define ownership by folder
- make reviewer routing part of the repository contract

### `.github/pull_request_template.md`

This file should also be created during `policyagent init`.

Its purpose is to:

- standardize change request information
- make review expectations clear
- help policy reviewers assess completeness

## 4. Core Repository Folders

### policies/

Holds primary policy documents.

Examples:

- information-security-policy.md
- access-control-policy.md

### controls/

Holds control statements and traceability mappings.

Examples:

- iso-27001-controls.md
- internal-control-map.yaml

### standards/

Holds mandatory standards that support policies.

Examples:

- password-standard.md
- encryption-standard.md

### procedures/

Holds step-by-step operational documents.

Examples:

- joiner-mover-leaver-procedure.md
- access-review-procedure.md

### knowledge/

Holds supporting material used for explanation and cited answers.

Examples:

- glossary.md
- faq.md
- review-guidelines.md

### evidence/

Holds release and governance evidence.

Examples:

- release-notes/
- mapping-decisions.md
- approval-checklist.md

### workflows/

Holds structured flows for drafting and review.

Examples:

- draft-policy.yaml
- review-policy.yaml

### agents/

Optional sub-agents specialized for policy work.

Examples:

- drafter/
- mapper/
- explainer/

## 5. LLM Usage Model

PolicyAgent uses LLMs for:

- drafting new policy text
- rewriting for clarity
- mapping text to controls and frameworks
- explaining meaning and change history
- answering policy questions with citations

PolicyAgent does not use LLMs as the source of truth.

The source of truth is always the repository contents and Git history.

## 6. Git Lifecycle Model

PolicyAgent assumes:

- edits happen on branches
- changes are reviewed in pull requests
- protected branches control approval
- releases are tagged
- auditability comes from commits, PRs, blame, and tags

## 7. CLI Responsibilities

### `policyagent init`

Scaffold a repository matching this spec, including reviewer workflow files such as `.github/CODEOWNERS`.

### `policyagent validate`

Validate required files and folder references.

### `policyagent draft`

Draft policy text through an adapter.

### `policyagent map`

Map policy text to controls or frameworks.

### `policyagent explain`

Explain a policy, policy section, or version difference with citations.

### `policyagent ask`

Answer a question using repository documents.

### `policyagent info`

Summarize repository structure and metadata.

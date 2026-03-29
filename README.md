# PolicyAgent

PolicyAgent is a git-native framework for policy authoring, explanation, and governance.

It follows the same separation of concerns that makes `gitagent` easy to understand:

- `spec` = the policy repository contract
- `src/commands` = CLI
- `src/adapters` = integrations for any LLM
- `examples` = reference policy repos
- `docs` = governance and architecture

PolicyAgent is intentionally not a policy evaluation engine. Its job is to help teams:

- draft policies from natural language
- map policies to controls and frameworks
- explain policy intent and approval history
- answer policy questions using repository documents as the source of truth
- keep Git as the full lifecycle for policy change management

## Core Idea

Your repository becomes your policy workspace.

Git handles the lifecycle:

- pull requests for policy changes
- branch protection for approval
- tags for approved releases
- commit history and blame as the audit trail

LLMs help with language work:

- drafting
- summarizing
- mapping
- explanation
- Q&A with citations

## Project Structure

```text
policyagent/
├── docs/
├── examples/
├── spec/
├── src/
│   ├── adapters/
│   ├── commands/
│   └── utils/
├── package.json
└── tsconfig.json
```

## Policy Repository Contract

A PolicyAgent-managed policy repository looks like this:

```text
my-policy-repo/
├── policyagent.yaml
├── PURPOSE.md
├── RULES.md
├── GOVERNANCE.md
├── policies/
├── controls/
├── standards/
├── procedures/
├── knowledge/
├── evidence/
├── workflows/
├── agents/
└── .policyagent/
```

See `spec/SPECIFICATION.md` for the full contract.

## Main Capabilities

- `init`: scaffold a new policy repository
- `validate`: validate structure and references
- `draft`: draft a policy from natural language using an adapter
- `map`: map a policy to controls or frameworks
- `explain`: explain a policy or a change with citations
- `ask`: answer policy questions from repo documents
- `info`: summarize the repository and lifecycle metadata
- `details`: show repository details, file coverage, and Git metadata
- `interactions`: single entrypoint for draft, map, explain, ask, and details workflows

## Installation

```bash
# Clone the repository
git clone https://github.com/Monst3rSec/PolicyAgent.git
cd PolicyAgent

# Install dependencies
npm install

# Build the CLI
npm run build
```

You can then run the CLI with:

```bash
node dist/index.js --help
```

If you want the command available as `policyagent` on your machine:

```bash
npm install -g .
policyagent --help
```

## CLI Examples

```bash
# Basic repository summary
policyagent info -d ./examples/minimal-policy-repo

# Full repository details with file listings
policyagent details -d ./examples/minimal-policy-repo

# JSON output for scripting
policyagent info -d ./examples/minimal-policy-repo --json

# Unified interaction command
policyagent interactions -a openai -m ask -i "What is approved policy?" -d ./examples/minimal-policy-repo

# Use the alias
policyagent interact -a anthropic -m explain -i policies/information-security-policy.md -d ./examples/minimal-policy-repo
```

## Command Overview

```bash
policyagent init
policyagent validate -d <repo>
policyagent info -d <repo>
policyagent details -d <repo>
policyagent draft -a <adapter> -p "<prompt>"
policyagent map -a <adapter> -f <file>
policyagent explain -a <adapter> -f <file>
policyagent ask -a <adapter> -q "<question>"
policyagent interactions -a <adapter> -m <mode> -i "<input>" -d <repo>
```

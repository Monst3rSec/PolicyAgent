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

## CLI Examples

```bash
# Basic repository summary
policyagent info -d ./examples/minimal-policy-repo

# Full repository details with file listings
policyagent details -d ./examples/minimal-policy-repo

# JSON output for scripting
policyagent info -d ./examples/minimal-policy-repo --json
```

# Project Structure

## Framework Repository

```text
policyagent/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── GOVERNANCE.md
│   ├── PROJECT_STRUCTURE.md
│   └── REQUIREMENTS.md
├── examples/
│   └── minimal-policy-repo/
├── spec/
│   ├── SPECIFICATION.md
│   └── schemas/
├── src/
│   ├── adapters/
│   ├── commands/
│   ├── utils/
│   └── index.ts
├── package.json
└── tsconfig.json
```

## Managed Policy Repository

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

## Folder Meanings

- `policies/`: policy documents that define intent and direction
- `controls/`: control statements mapped to policies
- `standards/`: mandatory implementation standards
- `procedures/`: operational step-by-step documents
- `knowledge/`: reference material for explanation and Q&A
- `evidence/`: release notes, approvals, traceability material
- `workflows/`: structured drafting and review flows
- `agents/`: optional sub-agent definitions like drafter or mapper
- `.policyagent/`: local runtime state, ignored by Git


# MVP Plan

## What To Build First

Start with the smallest useful version of PolicyAgent.

### Phase 1. Repository Contract

Build:

- `policyagent init`
- `policyagent validate`
- `policyagent info`

Goal:

- create a clear and repeatable repository structure
- make the spec easy to adopt
- ensure required files are present

### Phase 2. Adapter Foundation

Build:

- generic adapter interface
- provider adapters for OpenAI, Anthropic, and Google
- adapter selection from the manifest

Goal:

- let the rest of the project stay provider-agnostic
- make it easy to add enterprise or internal adapters later

### Phase 3. Authoring Workflows

Build:

- `policyagent draft`
- context loading from `policies/`, `standards/`, `procedures/`, and `knowledge/`
- output formatting for draft documents

Goal:

- draft useful first versions of policy text
- keep results grounded in repository context

### Phase 4. Explanation Workflows

Build:

- `policyagent explain`
- `policyagent ask`
- citation formatting for answers

Goal:

- make policies easier to understand
- support reviewers and non-expert readers

### Phase 5. Mapping Workflows

Build:

- `policyagent map`
- output structure for control mappings
- traceability documents in `controls/` or `evidence/`

Goal:

- connect policy language to frameworks and internal controls

## What Success Looks Like

The MVP is successful when a team can:

- create a policy repo from the CLI
- draft a policy from a prompt
- ask questions about repository policy documents
- explain policy text with citations
- map a policy to a framework using an adapter
- review and approve all changes through Git


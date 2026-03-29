# PolicyAgent Requirements

## Goal

Build a git-native project that helps teams create, manage, explain, and review policy repositories using LLMs.

PolicyAgent is not a rules engine. It is a policy authoring and governance framework.

## Main Requirement

The main requirement is:

- use LLMs only for authoring and explanation
- use Git as the policy lifecycle
- use adapters so any LLM provider can be connected
- keep a simple separation of concerns similar to `gitagent`

## Functional Requirements

### 1. Policy Repository Contract

The system must define a clear repository contract for policy work.

Required concepts:

- manifest file for repo metadata
- purpose and scope document
- rules for how PolicyAgent itself should behave
- directories for policy documents and related operational material

### 2. LLM-Based Authoring

The system must support drafting policy text from natural language prompts.

Examples:

- draft a new access control policy
- rewrite a standard in clearer language
- generate a procedure from an approved policy

### 3. LLM-Based Explanation

The system must explain policy meaning in simple language.

Examples:

- summarize policy intent
- explain why a section exists
- explain the difference between two policy versions
- answer policy questions with citations from repository files

### 4. Mapping

The system must support mapping policy text to controls and frameworks.

Examples:

- map a policy to ISO 27001 controls
- map a procedure to internal controls
- identify uncovered controls

### 5. Git-Native Lifecycle

The system must treat Git as the source of truth for policy governance.

Required lifecycle model:

- policy changes go through pull requests
- protected branches enforce review
- releases are tagged
- `git blame` and `git log` provide audit history

### 6. Adapters

The system must support adapters for multiple LLM providers.

Minimum adapter responsibilities:

- convert PolicyAgent requests into provider-specific prompts
- normalize responses
- keep provider credentials and configuration outside the policy repo

### 7. Validation

The system must validate the policy repository structure and references.

Examples:

- required files exist
- referenced controls exist
- referenced standards exist
- workflows point to real files

## Non-Functional Requirements

- easy to understand for non-engineering teams
- plain Markdown and YAML first
- portable across LLM providers
- auditable by reading the repository directly
- simple enough to start with a minimal template

## Out of Scope

These are intentionally not part of PolicyAgent:

- policy evaluation engine
- real-time decision enforcement
- runtime authorization checks
- vendor lock-in to one LLM provider


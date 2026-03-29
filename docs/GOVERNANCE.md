# Governance Model

## Policy Lifecycle

PolicyAgent assumes the following lifecycle:

1. A user drafts or updates policy content
2. The change is committed on a branch
3. A pull request is opened
4. Reviewers approve or request changes
5. Approved changes merge to a protected branch
6. Stable releases are tagged

## Why Git Fits Policy Work

Git gives policy teams the exact controls they usually need:

- review before approval
- clear version history
- easy comparison between versions
- named release points
- author attribution

## Recommended Branching Model

- `main`: approved policy baseline
- `draft/*`: working branches for drafting
- `review/*`: branches prepared for formal review
- tags like `policy-v1.0.0`: approved release snapshots

## Recommended Review Roles

- author: drafts or edits policy text
- reviewer: checks clarity and correctness
- approver: signs off on policy change
- auditor: reviews the trail when needed

## Repository Audit Trail

The audit trail comes from normal Git metadata:

- commit history shows what changed
- pull requests show review and approval discussion
- blame shows who last changed a line
- tags show approved release boundaries


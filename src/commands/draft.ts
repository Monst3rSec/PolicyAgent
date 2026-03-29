import { Command } from 'commander';

export const draftCommand = new Command('draft')
  .description('Draft policy text from natural language using an adapter')
  .requiredOption('-a, --adapter <adapter>', 'Adapter name')
  .requiredOption('-p, --prompt <prompt>', 'Drafting prompt')
  .action((options: { adapter: string; prompt: string }) => {
    console.log('policyagent draft');
    console.log(`adapter: ${options.adapter}`);
    console.log(`prompt: ${options.prompt}`);
    console.log('This command should call the adapter and return a policy draft based on repository context.');
  });


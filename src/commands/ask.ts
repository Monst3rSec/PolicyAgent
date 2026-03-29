import { Command } from 'commander';

export const askCommand = new Command('ask')
  .description('Answer a policy question using repository documents')
  .requiredOption('-a, --adapter <adapter>', 'Adapter name')
  .requiredOption('-q, --question <question>', 'Question to answer')
  .action((options: { adapter: string; question: string }) => {
    console.log('policyagent ask');
    console.log(`adapter: ${options.adapter}`);
    console.log(`question: ${options.question}`);
    console.log('This command should answer questions with citations to repository content.');
  });


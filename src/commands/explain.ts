import { Command } from 'commander';

export const explainCommand = new Command('explain')
  .description('Explain a policy or policy change with citations')
  .requiredOption('-a, --adapter <adapter>', 'Adapter name')
  .requiredOption('-f, --file <file>', 'Policy file to explain')
  .action((options: { adapter: string; file: string }) => {
    console.log('policyagent explain');
    console.log(`adapter: ${options.adapter}`);
    console.log(`file: ${options.file}`);
    console.log('This command should explain policy meaning, context, and change impact using repository sources.');
  });


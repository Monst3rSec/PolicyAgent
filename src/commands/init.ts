import { Command } from 'commander';

export const initCommand = new Command('init')
  .description('Scaffold a new PolicyAgent policy repository')
  .option('-t, --template <template>', 'Template to use', 'minimal')
  .action((options: { template: string }) => {
    console.log('policyagent init');
    console.log(`template: ${options.template}`);
    console.log('This starter scaffold is defined in the repository templates and spec.');
  });


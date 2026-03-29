import { Command } from 'commander';

export const validateCommand = new Command('validate')
  .description('Validate a PolicyAgent-managed policy repository')
  .option('-d, --dir <dir>', 'Repository directory', '.')
  .action((options: { dir: string }) => {
    console.log('policyagent validate');
    console.log(`dir: ${options.dir}`);
    console.log('Validation should check required files, folders, and references against the spec.');
  });


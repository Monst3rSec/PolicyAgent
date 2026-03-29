import { Command } from 'commander';

const VALID_MODES = ['draft', 'map', 'explain', 'ask', 'details'] as const;

type InteractionMode = typeof VALID_MODES[number];

function normalizeMode(mode: string): InteractionMode {
  if ((VALID_MODES as readonly string[]).includes(mode)) {
    return mode as InteractionMode;
  }

  throw new Error(`Unsupported interaction mode "${mode}". Valid modes: ${VALID_MODES.join(', ')}`);
}

export const interactionsCommand = new Command('interactions')
  .alias('interact')
  .description('Single entrypoint for common PolicyAgent interactions')
  .requiredOption('-a, --adapter <adapter>', 'Adapter name')
  .requiredOption('-m, --mode <mode>', 'Interaction mode: draft, map, explain, ask, details')
  .option('-i, --input <input>', 'Prompt, file path, or question for the selected mode', '')
  .option('-d, --dir <dir>', 'Repository directory', '.')
  .action((options: { adapter: string; mode: string; input: string; dir: string }) => {
    const mode = normalizeMode(options.mode);

    console.log('policyagent interactions');
    console.log(`adapter: ${options.adapter}`);
    console.log(`mode: ${mode}`);
    console.log(`dir: ${options.dir}`);

    if (mode === 'details') {
      console.log('Use this mode to inspect repository structure, key files, and Git metadata.');
      console.log('Recommended next command:');
      console.log(`policyagent details -d ${options.dir}`);
      return;
    }

    console.log(`input: ${options.input}`);

    switch (mode) {
      case 'draft':
        console.log('This interaction should produce a new policy draft from natural language and repository context.');
        break;
      case 'map':
        console.log('This interaction should map repository policy content to frameworks or internal controls.');
        break;
      case 'explain':
        console.log('This interaction should explain policy meaning, policy changes, or policy intent with citations.');
        break;
      case 'ask':
        console.log('This interaction should answer a policy question using repository files as the source of truth.');
        break;
    }
  });


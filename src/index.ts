#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { validateCommand } from './commands/validate.js';
import { draftCommand } from './commands/draft.js';
import { mapCommand } from './commands/map.js';
import { explainCommand } from './commands/explain.js';
import { askCommand } from './commands/ask.js';
import { infoCommand, detailsCommand } from './commands/info.js';

const program = new Command();

program
  .name('policyagent')
  .description('A git-native framework for policy authoring, explanation, and governance')
  .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(validateCommand);
program.addCommand(draftCommand);
program.addCommand(mapCommand);
program.addCommand(explainCommand);
program.addCommand(askCommand);
program.addCommand(infoCommand);
program.addCommand(detailsCommand);

program.parse();

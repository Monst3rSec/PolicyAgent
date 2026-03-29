import { Command } from 'commander';
import { getRepoDetails } from '../utils/repo-details.js';

export const infoCommand = new Command('info')
  .description('Summarize a PolicyAgent repository')
  .option('-d, --dir <dir>', 'Repository directory', '.')
  .option('--json', 'Output JSON', false)
  .option('-v, --verbose', 'Show file listings for each section', false)
  .action((options: { dir: string; json: boolean; verbose: boolean }) => {
    const details = getRepoDetails(options.dir);

    if (options.json) {
      console.log(JSON.stringify(details, null, 2));
      return;
    }

    console.log('PolicyAgent Repository Details');
    console.log(`root: ${details.root}`);

    if (details.manifest) {
      console.log(`name: ${details.manifest.name}`);
      console.log(`version: ${details.manifest.version}`);
      console.log(`description: ${details.manifest.description}`);
      console.log(`spec_version: ${details.manifest.spec_version}`);
      console.log(`owners: ${(details.manifest.owners ?? []).join(', ') || '(none)'}`);
      console.log(`reviewers: ${(details.manifest.reviewers ?? []).join(', ') || '(none)'}`);
      console.log(`default_adapter: ${details.manifest.adapters?.default ?? '(none)'}`);
      console.log(`enabled_adapters: ${(details.manifest.adapters?.enabled ?? []).join(', ') || '(none)'}`);
      console.log(`control_frameworks: ${(details.manifest.control_frameworks ?? []).join(', ') || '(none)'}`);
    } else {
      console.log('manifest: policyagent.yaml not found');
    }

    console.log(`purpose: ${details.purposePreview ?? '(missing)'}`);
    console.log(`rules: ${details.rulesPreview ?? '(missing)'}`);
    console.log(`governance: ${details.governancePreview ?? '(missing)'}`);

    console.log('');
    console.log('sections:');
    for (const section of details.sections) {
      console.log(`- ${section.path}: ${section.exists ? `${section.fileCount} file(s)` : 'missing'}`);
      if (options.verbose && section.files.length > 0) {
        for (const file of section.files) {
          console.log(`  ${file}`);
        }
      }
    }

    console.log('');
    console.log('git:');
    console.log(`- initialized: ${details.git.isRepo ? 'yes' : 'no'}`);
    console.log(`- branch: ${details.git.branch ?? '(none)'}`);
    console.log(`- latest_commit: ${details.git.latestCommit ?? '(none)'}`);
    console.log(`- remotes: ${details.git.remotes.length > 0 ? details.git.remotes.join(' | ') : '(none)'}`);
    console.log(`- tags: ${details.git.tags.length > 0 ? details.git.tags.join(', ') : '(none)'}`);
  });

export const detailsCommand = new Command('details')
  .description('Alias for "policyagent info --verbose"')
  .option('-d, --dir <dir>', 'Repository directory', '.')
  .option('--json', 'Output JSON', false)
  .action((options: { dir: string; json: boolean }) => {
    const args = ['node', 'policyagent', 'info'];
    void args;

    const details = getRepoDetails(options.dir);
    if (options.json) {
      console.log(JSON.stringify(details, null, 2));
      return;
    }

    console.log('PolicyAgent Details');
    console.log(`root: ${details.root}`);
    console.log('');
    for (const section of details.sections) {
      console.log(`${section.path}: ${section.exists ? `${section.fileCount} file(s)` : 'missing'}`);
      for (const file of section.files) {
        console.log(`- ${file}`);
      }
      if (section.files.length === 0) {
        console.log('- (none)');
      }
      console.log('');
    }
  });

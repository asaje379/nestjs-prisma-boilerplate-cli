import { execSync, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { resolve } from 'path';
import { chdir, exit } from 'process';
import { Commands, PackageManager, Questions, Vars } from 'src/constants';

const { name, description } = Commands.init;

@Command({ name, description })
export class InitCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super();
  }

  async run(passedParams: string[]): Promise<void> {
    const [givenPath] = passedParams;
    if (!givenPath) {
      throw new Error('Missing required path for project initialisation');
    }

    const path = resolve(givenPath);

    await this.checkPath(path);
    const packageManager = await this.getPreferedNpm();

    await this.cloneBoilerplateRepository(path);
    chdir(path);
    this.cleanGitConfigs();
    await this.installDependencies(packageManager);
  }

  async checkPath(path: string) {
    if (existsSync(path)) {
      const { override } = await this.inquirer.ask<{ override: boolean }>(
        Questions.overrideExisting,
        undefined,
      );

      if (override) {
        rmSync(path, { recursive: true, force: true });
        return;
      }

      exit();
    }
  }

  async getPreferedNpm() {
    const { npm } = await this.inquirer.ask<{ npm: string }>(
      Questions.config,
      undefined,
    );
    console.log('Prefered npm: ', npm);

    return npm as PackageManager;
  }

  cloneBoilerplateRepository(path: string) {
    return new Promise((res) => {
      console.log('Creating the project...');
      const subProcess = spawn(
        'git',
        ['clone', Vars.boilerplateRepoUrl, path],
        {
          stdio: 'inherit',
        },
      );
      subProcess.on('close', () => {
        res(undefined);
      });
    });
  }

  cleanGitConfigs() {
    console.log('Clean previous git configs');
    execSync(`rm -rf .git`);
  }

  installDependencies(pm: PackageManager) {
    return new Promise((res) => {
      console.log('Installing dependencies...');
      const subProcess = spawn(pm, ['install'], {
        stdio: 'inherit',
      });
      subProcess.on('close', () => {
        res(undefined);
      });
    });
  }
}

export const Commands = {
  init: { name: 'init', description: 'Create new project' },
};

export const Questions = {
  config: 'config-questions',
  overrideExisting: 'override-existing-questions',
};

export const Vars = {
  boilerplateRepoUrl: 'https://github.com/asaje379/nestjs-boilerplate',
};

export const packageManagerInstallCommand = {
  npm: 'npm i',
  yarn: 'yarn',
  pnpm: 'pnpm i',
};

export type PackageManager = 'npm' | 'yarn' | 'pnpm';

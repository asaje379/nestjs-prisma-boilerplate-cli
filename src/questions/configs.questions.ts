import { Question, QuestionSet } from 'nest-commander';
import { Questions } from 'src/constants';

@QuestionSet({ name: Questions.config })
export class ConfigsQuestions {
  @Question({
    name: 'npm',
    message: "What's your prefer node package manager ?",
    type: 'list',
    choices: ['npm', 'yarn', 'pnpm'],
  })
  getPreferedPackageManager(val: string) {
    return val;
  }
}

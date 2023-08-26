import { Question, QuestionSet } from 'nest-commander';
import { Questions } from 'src/constants';

@QuestionSet({ name: Questions.overrideExisting })
export class OverrideExistingQuestions {
  @Question({
    name: 'override',
    message: 'Conflict on project name. Overwrite ?',
    type: 'confirm',
  })
  overrideExistingDirectory(val: boolean) {
    return val;
  }
}

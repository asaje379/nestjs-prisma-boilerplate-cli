import { Module } from '@nestjs/common';
import { InitCommand } from './commands/init.command';
import { ConfigsQuestions } from './questions/configs.questions';
import { OverrideExistingQuestions } from './questions/override-existing.questions';

@Module({
  providers: [InitCommand, ConfigsQuestions, OverrideExistingQuestions],
})
export class AppModule {}

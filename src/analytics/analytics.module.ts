import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { LearningProgressModule } from '../learning-progress/learning-progress.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { AuthorizationModule } from '../common/authorization/authorization.module';

@Module({
  imports: [LearningProgressModule, SubmissionsModule, AuthorizationModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

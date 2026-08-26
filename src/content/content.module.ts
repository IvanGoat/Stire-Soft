import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { LearningUnit } from '../learning-unit/entities/learning-unit.entity';
import { ContentRepository } from './content.repository';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { AuthModule } from '../auth/auth.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { AuthorizationModule } from '../common/authorization/authorization.module';
import { ContentRenderingModule } from '../content-rendering/content-rendering.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, LearningUnit]),
    AuthModule,
    ActivityLogModule,
    AuthorizationModule,
    ContentRenderingModule,
  ],
  controllers: [ContentController],
  providers: [ContentRepository, ContentService],
  exports: [ContentService, ContentRepository],
})
export class ContentModule {}

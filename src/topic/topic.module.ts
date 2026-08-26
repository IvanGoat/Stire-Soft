import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { Topic } from './entities/topic.entity';
import { SectionModule } from '../section/section.module';
import { AuthModule } from '../auth/auth.module';
import { AuthorizationModule } from '../common/authorization/authorization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Topic]),
    SectionModule,   // Para validar ownership vía SectionService
    AuthModule,
    AuthorizationModule,
  ],
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}

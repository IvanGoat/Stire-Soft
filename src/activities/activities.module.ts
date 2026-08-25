import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity } from './entities/activity.entity';
import { ActivitiesRepository } from './activities.repository';
import { AuthorizationModule } from '../common/authorization/authorization.module';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), AuthorizationModule],
  controllers: [ActivitiesController],
  providers: [ActivitiesService, ActivitiesRepository],
  exports: [ActivitiesService, ActivitiesRepository],
})
export class ActivitiesModule {}

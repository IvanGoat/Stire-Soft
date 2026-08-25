import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from '../../class/entities/class.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Enrollment])],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}

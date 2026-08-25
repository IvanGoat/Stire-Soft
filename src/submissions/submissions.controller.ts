import { Controller, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { SubmissionsService } from './submissions.service';
import { StartSubmissionDto } from './dto/start-submission.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

@ApiTags('Submissions')
@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('start')
  @ApiOperation({ summary: 'Iniciar un intento de actividad' })
  startSubmission(@Body() dto: StartSubmissionDto, @GetUser() user: User) {
    return this.submissionsService.startSubmission(dto, user.id);
  }

  // P1-03: sin límite específico, un cliente podía reintentar envíos de
  // examen sin fricción más allá del límite global (inactivo hasta este bloque).
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post(':id/submit')
  @ApiOperation({ summary: 'Enviar y calificar respuestas' })
  submitAnswers(@Param('id') id: string, @Body() dto: SubmitAnswersDto, @GetUser() user: User) {
    return this.submissionsService.submitAnswers(id, dto, user.id);
  }

  @Put(':id/autosave')
  @ApiOperation({ summary: 'Autoguardado del progreso' })
  autosave(@Param('id') id: string, @Body() dto: SubmitAnswersDto, @GetUser() user: User) {
    return this.submissionsService.autosave(id, dto, user.id);
  }
}

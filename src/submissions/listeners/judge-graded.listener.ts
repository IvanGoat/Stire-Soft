import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SubmissionsService } from '../submissions.service';
import { JudgeAnswerGradedEvent } from '../../common/events/judge-answer-graded.event';
import { JudgeAnswerFailedEvent } from '../../common/events/judge-answer-failed.event';

// Extremo receptor del pipeline de calificación asíncrona (ver
// JudgeExecutionService). Vive en el dominio submissions porque es quien
// tiene la autoridad para mutar SubmissionAnswer/Submission — judge-engine
// solo sabe ejecutar código y reportar el resultado por evento.
@Injectable()
export class JudgeGradedListener {
  private readonly logger = new Logger(JudgeGradedListener.name);

  constructor(private readonly submissionsService: SubmissionsService) {}

  @OnEvent('judge.answer-graded')
  async handleGraded(event: JudgeAnswerGradedEvent) {
    const answer = await this.submissionsService.updateAnswerScore(
      event.submissionAnswerId,
      event.isCorrect,
      event.score,
      event.feedback,
    );
    if (answer) {
      await this.submissionsService.consolidateSubmission(answer.submissionId);
    }
  }

  @OnEvent('judge.answer-failed')
  async handleFailed(event: JudgeAnswerFailedEvent) {
    this.logger.warn(
      `Marcando respuesta ${event.submissionAnswerId} como fallida: ${event.errorMessage}`,
    );
    await this.submissionsService.markAsFailed(event.submissionAnswerId, event.errorMessage);
  }
}

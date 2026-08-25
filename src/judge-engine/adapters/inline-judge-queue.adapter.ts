import { Injectable, Logger } from '@nestjs/common';
import { JudgeExecutionService } from '../judge-execution.service';
import type { JudgeQueue, JudgeJobData } from '../judge-queue.interface';

// ADR 08 — modo por defecto (QUEUE_DRIVER=inline). Sin Redis, sin BullMQ:
// el trabajo se despacha fuera del ciclo del request con setImmediate y se
// ejecuta contra el mismo SandboxAdapter que usaria el modo redis. El
// llamador (SubmissionsService.submitAnswers) no espera a que termine.
@Injectable()
export class InlineJudgeQueueAdapter implements JudgeQueue {
  private readonly logger = new Logger(InlineJudgeQueueAdapter.name);

  constructor(private readonly executionService: JudgeExecutionService) {}

  async enqueue(data: JudgeJobData): Promise<void> {
    setImmediate(() => {
      this.executionService.gradeAnswer(data).catch((err: Error) => {
        this.logger.error(
          `Fallo al calificar de forma inline la respuesta ${data.submissionAnswerId}: ${err.message}`,
        );
        this.executionService
          .handleFailure(data.submissionAnswerId, err.message)
          .catch((markErr: Error) =>
            this.logger.error(`No se pudo marcar como fallida: ${markErr.message}`),
          );
      });
    });
  }
}

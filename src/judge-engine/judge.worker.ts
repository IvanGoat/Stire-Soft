import { Logger } from '@nestjs/common';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { JudgeExecutionService } from './judge-execution.service';
import type { JudgeJobData } from './judge-queue.interface';

// Solo se registra cuando QUEUE_DRIVER=redis (ver judge-engine.module.ts).
// La calificacion real vive en JudgeExecutionService, compartida con el
// modo inline — este worker es solo el consumidor de BullMQ.
@Processor('judge')
export class JudgeWorker extends WorkerHost {
  private readonly logger = new Logger(JudgeWorker.name);

  constructor(private readonly executionService: JudgeExecutionService) {
    super();
  }

  async process(job: Job<JudgeJobData>): Promise<{ success: boolean; score: number }> {
    return this.executionService.gradeAnswer(job.data);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error) {
    this.logger.error(`Trabajo ${job.id} falló con error: ${error.message}`);

    if (job.attemptsMade >= (job.opts?.attempts || 1)) {
      this.logger.warn(`Trabajo ${job.id} ha fallado definitivamente (DLQ). Marcando submission como fallida.`);
      const { submissionAnswerId } = job.data;
      if (submissionAnswerId) {
        await this.executionService.handleFailure(submissionAnswerId, error.message);
      }
    }
  }
}

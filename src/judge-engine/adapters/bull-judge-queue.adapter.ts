import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import type { JudgeQueue, JudgeJobData } from '../judge-queue.interface';

// ADR 08 — modo QUEUE_DRIVER=redis: pipeline actual con BullMQ, para
// produccion con concurrencia alta. Requiere Redis disponible.
@Injectable()
export class BullJudgeQueueAdapter implements JudgeQueue {
  constructor(private readonly queue: Queue) {}

  async enqueue(data: JudgeJobData): Promise<void> {
    await this.queue.add('evaluate-code', data, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}

export class JudgeAnswerFailedEvent {
  constructor(
    public readonly submissionAnswerId: number,
    public readonly errorMessage: string,
  ) {}
}

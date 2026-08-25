export class JudgeAnswerGradedEvent {
  constructor(
    public readonly submissionAnswerId: number,
    public readonly isCorrect: boolean,
    public readonly score: number,
    public readonly feedback: string,
  ) {}
}

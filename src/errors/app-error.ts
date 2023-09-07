export interface ErrorProps {
  statusCode?: number;
  message: string;
}

export class AppError {
  public error: ErrorProps;

  constructor({ message, statusCode = 400 }: ErrorProps) {
    this.error = {
      statusCode: statusCode,
      message: message,
    };
  }

  public get statusCode(): number {
    return this.error.statusCode;
  }

  public get message(): string {
    return this.error.message;
  }
}

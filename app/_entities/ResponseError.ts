export interface IResponseError {
  status: number;
  message: string;
  field?: string;
}

export class ResponseError extends Error implements IResponseError {
  readonly status: number;
  readonly field?: string;

  constructor(status: number, message: string, field?: string) {
    super(message);

    this.status = status;
    this.field = field;
  }
}

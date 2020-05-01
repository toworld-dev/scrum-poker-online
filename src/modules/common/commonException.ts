export class CommonException extends Error {
  constructor(message: string, public errorCode: string) {
    super(message);
  }
}

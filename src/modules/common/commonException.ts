export class ExceptionErrorClass {
  constructor(public errorCode: string, public httpStatusCode?: number) {}
}

export class CommonException extends Error {
  constructor(message: string, public errorClass: ExceptionErrorClass) {
    super(message);
  }
}

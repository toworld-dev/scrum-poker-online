import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpServer,
} from '@nestjs/common';
import { CommonException } from './commonException';

@Catch(CommonException)
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(protected readonly applicationRef?: HttpServer) {}

  catch(exception: CommonException, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const errors = exception.message;
      const statusCode = exception.errorClass.httpStatusCode;

      const responseBody = {
        statusCode: statusCode,
        errors,
        errorCode: exception.errorClass.errorCode,
        path: request.url,
      };

      this.applicationRef.reply(
        host.getArgByIndex(1),
        responseBody,
        statusCode,
      );
    }
  }
}

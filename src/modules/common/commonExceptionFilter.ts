import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Optional,
  Inject,
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
      let statusCode = 500;

      const errorCode = exception.errorCode.replace(/\D/i, '');

      if (errorCode.startsWith('00')) {
        statusCode = 409;
      }

      const responseBody = {
        statusCode: statusCode,
        errors,
        errorCode: exception.errorCode,
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

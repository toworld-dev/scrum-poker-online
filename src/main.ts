import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { CommonExceptionFilter } from './modules/common/commonExceptionFilter';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const logger = new Logger('bootstrap');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CommonExceptionFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors(
    process.env.NODE_ENV === 'production'
      ? {
          origin: [/toworld\.dev/],
        }
      : {},
  );

  const options = new DocumentBuilder()
    .setTitle('NestJS Scrum Poker Online')
    .setDescription('The Scrum Poker Onlone')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey' }, 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const port = +process.env.PORT || 3000;
  SwaggerModule.setup('api', app, document);

  Sentry.init({
    dsn: process.env.SENTRY || '',
  });

  await app.listen(port, '0.0.0.0');
  logger.log(`Application listening on port: ${port}`);
}
bootstrap();

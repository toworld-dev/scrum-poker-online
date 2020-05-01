import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('NestJS Scrum Poker Online')
    .setDescription('The Scrum Poker Onlone')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey' }, 'header')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const port = process.env.PORT || 3000;
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

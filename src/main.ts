import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found.filter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('foo E-commerce - orders service')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  // cors enabled from all hosts which is not good idea in production
  app.enableCors();

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();

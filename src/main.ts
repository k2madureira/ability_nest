import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

const config = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configDoc = new DocumentBuilder()
    .setTitle(config.get('API_TITLE'))
    .setDescription(config.get('API_DESCRIPTION'))
    .setVersion(config.get('VERSION'))
    .build();
  const document = SwaggerModule.createDocument(
    app,
    configDoc,
  );
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(process.env.PORT || config.get('PORT'));
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Photo API')
    .setDescription('The Photo API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  const DEFAULT_PORT = 5000;
  await app.listen(process.env.PORT ?? DEFAULT_PORT, () => {
    console.log(`Listening on port ${process.env.PORT ?? DEFAULT_PORT}!`);

    console.log(
      `Click here to access the API documentation: http://localhost:${process.env.PORT ?? DEFAULT_PORT}/api-docs`,
    );
  });
}
bootstrap();

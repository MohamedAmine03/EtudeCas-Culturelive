import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation for incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Remove any properties not defined in DTOs
      forbidNonWhitelisted: true, // Reject requests with properties not defined in DTOs
    }),
  );

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Film Rental API') // Title for the API
    .setDescription('API documentation for the film rental system') // Description of the API
    .setVersion('1.0') // API version
    .build();

  const document = SwaggerModule.createDocument(app, config); // Generate Swagger document
  SwaggerModule.setup('api/docs', app, document); // Serve Swagger docs at /api/docs

  // Start the application on the defined port or default to 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

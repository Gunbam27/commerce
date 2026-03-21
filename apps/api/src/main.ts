import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie Parser
  app.use(cookieParser());

  // Validation Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS Enable
  const frontendUrl = process.env.FRONTEND_URL;
  const origins = [
    'http://localhost:3000',
    'https://portstyle.shop',
    'https://www.portstyle.shop',
  ];
  if (frontendUrl && !origins.includes(frontendUrl)) {
    origins.push(frontendUrl);
  }

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Commerce API')
    .setDescription('The Commerce Stack API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 9090;
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();

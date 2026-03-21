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
  console.log("🔥 ENV FRONTEND_URL:", process.env.FRONTEND_URL);
  console.log("🔥 CORS ORIGIN:", "https://portstyle.shop");

  app.enableCors({
    origin: "https://portstyle.shop",
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

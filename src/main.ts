import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImATeapotException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whiteListedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: function (origin, cb) {
      if (!origin) {
        cb(null, true);
        return;
      }

      if (whiteListedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new ImATeapotException('Not allowed by CORS'), false);
      }
    },
  });

  await app.listen(3001);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // 프론트엔드 도메인
    credentials: true, // 세션 쿠키를 허용
  });
  await app.listen(process.env.PORT || 3001);
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
}
bootstrap();
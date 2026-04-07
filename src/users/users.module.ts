import { Module, MiddlewareConsumer } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // }
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {   // consumer로 호출 
    // 모든 route에 대해 현재 사용자가 있고 로그인 상태인 경우, 사용자를 확인해서 request 객체에 할당
    // APP에 요청이 들어올 때마다, 
    // cookie-session 미들웨어 다음에 실행
    consumer.apply(CurrentUserMiddleware).forRoutes('*');   
  }
}

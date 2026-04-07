import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  // 모든 요청 핸들러에서 APP으로 요청한 사용자를 나타내는 "전체 사용자 엔터티"에 액세스 가능
  // ExecutionContext: 수신하는 request를 감싸는 래퍼, CallHandler: 라우트 핸들러
  async intercept(context: ExecutionContext, handler: CallHandler) {  
    const request = context.switchToHttp().getRequest();
    // request.session 속성을 통해 요청의 cookie를 확인
    // 세션, cookie를 통해 현재 사용자(요청한 사용자)를 파악
    const { userId } = request.session || {};
    if (userId) {
      // userService를 이용하여 사용자를 가져오고
      const user = await this.usersService.findOne(userId);
      // request.currentUser 속성에 할당
      request.currentUser = user;
    }

    return handler.handle();
  }
}

import {
  CanActivate, 
  ExecutionContext
} from '@nestjs/common';

// 인증된 사용자만 접근(보고서 생성)할 수 있도록 하는 가드
// APP에 로그인한 상태인지 확인
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    return request.session.userId;
  }
}


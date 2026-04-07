import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

// currentUser 속성이 할당된 경우, User 엔터티 인스턴스를 참조
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {    // 미들웨어 정의
  constructor(
    private usersService: UsersService    
    // 사용자 서비스에 액세스하기 위한 의존성 주입
    // 사용자 repo에서 request.session 객체 내 id로 사용자 정보 조회
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {    // 요청 객체, 응답 객체, NextFunction 입력, next는 미들웨어 체인으로 다음 미들웨어를 참조
    const { userId } = req.session || {};   // 세션 객체에 액세스하고 사용자 id 속성을 추출, 섹션 객체가 존재 or 빈 객체
    
    if (userId) {   // 사용자 Id가 정의되어있다면
      const user = await this.usersService.findOne(userId);   // 사용자 서비스에서 해당 사용자 조회
      // req 속성을 나타내는 인터페이스를 export하여 Express로 정의된 req객체를 사용
      // req 객체에 currentUser 속성을 추가
      req.currentUser = user;   // 해당 사용자 정보를 request.currentUser 속성에 할당
    }

    next();   // 다음 미들웨어 실행
  }
}
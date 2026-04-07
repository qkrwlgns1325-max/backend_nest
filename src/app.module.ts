import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// CfgModule: 어떤 파일을 읽을지 지정, CfgSvc: 파일 안의 내용을 읽어오는 서비스
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { DecryptModule } from './decryptsvc/decrypt.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { Decrypt } from './decryptsvc/decrypt.entity';

const cookieSession = require('cookie-session');
const settings = require('../ormconfig.js');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,     // 전역적으로 사용
      envFilePath: `.env.${process.env.NODE_ENV}`,  // 어떤 파일을 사용할지 지정(dev/test) 
    }), 
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   entities: [User, Report],
    //   database: 'db.sqlite',  // 환경 변수로 다중 DB 사용
    //   synchronize: true,
    // }),
    // TypeOrmModule.forRootAsync({  // DB 연결 설정을 한 곳에서 정의하고 Nest와 TypeORM이 사용하도록 만들기
    //   inject: [ConfigService],    // 의존성 탐색을 위해 해당하는 파일의 구성 서비스를 찾도록 지시, CfgSvc의 인스턴스에 접근
    //   useFactory: (config: ConfigService) => {   // CfgSvc의 사본 또는 인스턴스에 접근
    //     return {
    //       type: 'sqlite', 
    //       database: config.get<string>('DB_NAME'), 
    //       // App 실행 시 TypeORM이 사용자 엔터티, 속성, 타입을 확인
    //       // DB의 사용자 테이블의 상태를 확인하고 테이블의 속성이 사용자 엔터티의 속성과 (타입이)일치하는지 확인
    //       // ex) 사용자 엔터티 파일의 password 삭제 후 App을 재시작할 경우, 
    //       // TypeORM이 사용자 엔터티를 읽을 때 password 필드가 삭제된 것을 확인하여
    //       // DB의 사용자 테이블에서 자동으로 password 열 전체를 삭제
    //       // 반대로 문자열 name이 추가된 경우, DB의 사용자 테이블에서 자동으로 name 열을 추가
    //       // synchronize의 역할은 TypeORM이 시작할 때 DB의 구조를 엔터티의 상태와 동기화하는 것
    //       // 배포할 때는 false로 설정할 것을 권장(DB 구조를 자동으로 변경하는 과정에서 데이터 손실 방지)
    //       synchronize: true, 
    //       entities: [User, Report], 
    //     }; 
    //   }, 
    // }), 
    
    // TypeOrmModule.forRoot({
    //   synchronize: true, 
    //   entities: [User, Report, Decrypt],
    //   database: 'db.sqlite',
    // }), 
    TypeOrmModule.forRoot(settings),
    UsersModule, 
    ReportsModule, 
    DecryptModule,
  ], 
  controllers: [AppController],   // AppController가 
  providers: [
    AppService,                   // AppService를 의존성으로 사용
    {
      provide: APP_PIPE,  // APP 모듈에 글로벌 파이프 설정
      useValue: new ValidationPipe({    
        whitelist: true,
      }),
    }, 
  ],
})
export class AppModule {
  constructor(
    private configService: ConfigService  // ConfigService 의존성 주입
  ) {}

  configure(consumer: MiddlewareConsumer) {   // APP이 들어오는 트래픽을 수신할 때 자동으로 호출, 모든 route에 미들웨어 적용
    consumer.apply(cookieSession({    // 실행하려는 미들웨어
      keys: [this.configService.get('COOKIE_KEY')],   // 쿠키 암호화를 위한 문자열
    }), 
  ).forRoutes('*')      // 전체 APP에 들어오는 모든 요청에 이 미들웨어를 사용(Global)
  }
}
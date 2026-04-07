import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // AppService의 의존성을 통해 getHello 메서드를 호출하여 문자열 반환
    return this.appService.getHello();
  }
}

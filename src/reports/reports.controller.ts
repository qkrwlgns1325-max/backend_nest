import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Patch, 
  Param,  // id를 추출하기 위해 사용
  Get,    // req 라우트 핸들러 선언
  Query,  // req 쿼리스트링에서 데이터 추출
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';   // 인증된 사용자만 접근할 수 있도록 하는 가드
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) { }   // 서비스의 인스턴스에 접근

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  // @Get('/all')
  // findAll() {
  //   return this.reportsService.findAll();
  // }

  @Get('/approved')
  // @Serialize(ReportDto)
  findApproved() {
    return this.reportsService.findAllApproved();
  }

  @Get('/user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.reportsService.findAllByUserId(parseInt(userId));
  }

  @Get('/approved/:id')
  findApprovedById(@Param('id') id: string) {
    return this.reportsService.findApprovedById(parseInt(id));
  }

  // @Get('/approved/count')
  // findApprovedCnt(@Param('id') id: string) {
  //   return 
  // }

  // @Get('/approved/:id')
  

  @Post()   // 라우트 정의
  @UseGuards(AuthGuard)   // 로그인된 사용자만 보고서 생성 
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {   // 본문(CreateRportDto)에서 데이터를 추출하기 위한 라우트 핸들러
    return this.reportsService.create(body, user);  // CreateReportDto를 수신
  }

  // id와 본문을 받아서 approve 속성(boolean)을 확인하고 report 서비스에 전달
  // 해당하는 report를 찾아서 approved 속성을 업데이트하고 업데이트된 report를 저장
  @Patch('/:id')
  @UseGuards(AdminGuard)    // 관리자만 보고서 승인
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}

 
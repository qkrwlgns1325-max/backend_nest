import { 
  Controller, 
  Delete, 
  Post, 
  Body, 
  UseGuards, 
  Patch, 
  Param,  // id를 추출하기 위해 사용
  Get,    // req 라우트 핸들러 선언
  Query,  // req 쿼리스트링에서 데이터 추출
} from '@nestjs/common';
import { CreateDecryptDto } from './dtos/create-decrypt.dto';
import { DecryptService } from './decrypt.service';
import { AuthGuard } from '../guards/auth.guard';   // 인증된 사용자만 접근할 수 있도록 하는 가드
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { DecryptDto } from './dtos/decrypt.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveDecryptDto } from './dtos/approve-decrypt.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Controller('decrypt')
export class DecryptController {
  constructor(private decryptService: DecryptService) { }   // 서비스의 인스턴스에 접근

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.decryptService.createEstimate(query);
  }

  @Get('/unapproved')
  findAllUnapproved() {
    return this.decryptService.findAllUnapproved();
  }

  @Get('/approved')
  findApproved() {
    return this.decryptService.findAllApproved();
  }

  @Get('/approved/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.decryptService.findAllByUserId(parseInt(userId));
  }

  @Get('/approved/:id')
  findApprovedById(@Param('id') id: string) {
    return this.decryptService.findApprovedById(parseInt(id));
  }

  @Post()   // 라우트 정의
  @UseGuards(AuthGuard)   // 로그인된 사용자만 복호화 키 생성 
  @Serialize(DecryptDto)
  createDecrypt(@Body() body: CreateDecryptDto, @CurrentUser() user: User) { 
    return this.decryptService.create(body, user);  
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)    // 관리자만 복호화 승인
  approveDecrypt(@Param('id') id: string, @Body() body: ApproveDecryptDto) {
    return this.decryptService.changeApproval(id, body.approved);
  }

  @Delete('/approved/:id')
  @UseGuards(AdminGuard)
  deleteApproved(@Param('id') id: string) {
    return this.decryptService.remove(parseInt(id));
  }

  @Patch('/approved/:id')
  @UseGuards(AdminGuard)
  updateDecrypt(@Param('id') id: string, @Body() body: Partial<DecryptDto>) {
    return this.decryptService.update(parseInt(id), body);
  }

  @Delete('/unapproved/:id')
  @UseGuards(AdminGuard)
  deleteUnapproved(@Param('id') id: string) {
    return this.decryptService.remove(parseInt(id));
  }
}
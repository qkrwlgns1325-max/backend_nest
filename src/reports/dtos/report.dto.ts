import { Exclude, Expose, Transform } from 'class-transformer'
import { User } from '../../users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  family: string;

  @Expose()
  region: string;

  @Expose()
  lng: number;

  @Expose()
  lat: number; 

  @Expose()
  year: number; 

  @Expose()
  type: string;

  @Expose()
  hash: string;

  @Expose()
  ip: string;

  // @Exclude()
  // approved: boolean;

  // @Transform: 원래의 report 엔터티로부터 정보 가져오기
  // 엔터티 내 사용자 속성 확인 및 사용자의 ID 추출
  // 사용자 속성의 사용자 ID를 확인하여 userId 속성에 할당
  @Transform(({ obj }) => obj.user.id)  
  @Expose()
  userId: number;
}
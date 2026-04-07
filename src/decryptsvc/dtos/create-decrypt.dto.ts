import {
  IsString,   // 문자열인지 확인
  IsNumber,   // 숫자인지 확인
  Min, 
  Max, 
  IsLongitude, // 경도
  IsLatitude,  // 위도
} from 'class-validator'    // 각 속성을 검증하기 위한 클래스 검증기

export class CreateDecryptDto {
  @IsString()
  family: string;

  @IsString()
  description: string;

  @IsString()
  tool: string;

  // @IsString()
  // dropped: string[];
  
}


import {
  IsString,   // 문자열인지 확인
  IsNumber,   // 숫자인지 확인
  Min, 
  Max, 
  IsLongitude, // 경도
  IsLatitude,  // 위도
} from 'class-validator'    // 각 속성을 검증하기 위한 클래스 검증기
import { Expose, Transform } from 'class-transformer';  // 경도, 위도 등의 값을 파싱

// 새 report를 받기 위한 req의 속성과 동일
// 이미 존재하는 DTO를 사용

export class GetEstimateDto {
  // 반환할 결과(계산해야 하는 속성)는 필요 없음
  @IsString()
  family: string;

  @IsString()
  region: string;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))  // 문자열 형태의 년도를 받아 정수로 파싱, year 속성에 할당
  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

  @IsString()
  type: string;

  @IsString()
  hash: string;

  @IsString()
  ip: string;

  // @Transform(({ value }) => parseInt(value))
  // @IsNumber()
  // userId: number;

  // @IsString()
  // dropped: string[];
  
}


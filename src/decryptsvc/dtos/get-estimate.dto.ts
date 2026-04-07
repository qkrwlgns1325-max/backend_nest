import { IsString } from 'class-validator'    // 각 속성을 검증하기 위한 클래스 검증기

export class GetEstimateDto {
  // 반환할 결과(계산해야 하는 속성)는 필요 없음
  @IsString()
  family: string;

  @IsString()
  description: string;

  @IsString()
  tool: string;

}


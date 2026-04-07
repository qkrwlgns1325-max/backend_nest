import { IsString, IsEmail } from 'class-validator';    // 패키지를 통해 데코레이터 추가

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}


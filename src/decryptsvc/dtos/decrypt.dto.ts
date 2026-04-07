import { Expose, Transform } from 'class-transformer'
import { User } from '../../users/user.entity';

export class DecryptDto {
  @Expose()
  id: number;

  @Expose()
  family: string;

  @Expose()
  description: string;

  @Expose()
  tool: string;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)  
  @Expose()
  userId: number;
}
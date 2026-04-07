import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne,  // user.entity와 정 반대인 ManyToOne 관계
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Decrypt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  tool: string;

  @Column()
  family: string;

  @Column()
  description: string;
  
  @ManyToOne(() => User, (user) => user.decrypts)
  user: User;   // 한 사용자가 여러 개의 복호화 키를 생성할 수 있음 = 배열이 아님

}
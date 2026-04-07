import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne,  // user.entity와 정 반대인 ManyToOne 관계
} from 'typeorm';
import { User } from '../users/user.entity';

// report.entity 는 User 의존성을 가지고 있음
// report.entity와 userentity는 순환 의존 관계 > 출력 결과가 undefined

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  family: string;

  @Column()
  region: string;

  @Column() 
  lng: number;

  @Column()
  lat: number;

  @Column()
  year: number;

  @Column()
  type: string;

  @Column()
  hash: string;

  @Column()
  ip: string;

  // @Column()
  // userid: number;
  
  // Report, User가 정의되지 않는 문제 해결, 테이블 관계를 연결할 엔터티의 인스턴스 사용
  // user.reports를 사용해 user 속성 확인
  @ManyToOne(() => User, (user) => user.reports)
  user: User;   // 한 사용자가 여러 개의 보고서를 생성할 수 있음 = 배열이 아님

  // @Column()
  // dropped: string[];
}
import { 
  AfterInsert, 
  AfterRemove, 
  AfterUpdate, 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToMany, 
} from 'typeorm'
import { Report } from '../reports/report.entity'
import { Decrypt } from '../decryptsvc/decrypt.entity'

// user는 Report 의존성을 가지고 있음
// report.entity 파일 내 User 엔터티를 바로 참조할 수 없음 

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  // Report 엔터티 클래스를 반환하는 함수
  // Report, User가 정의되지 않는 문제 해결, 테이블 관계를 연결할 엔터티의 인스턴스 사용
  // report.user를 사용해 reports 목록으로 연결 확인
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Decrypt, (decrypt) => decrypt.user)
  decrypts: Decrypt[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}


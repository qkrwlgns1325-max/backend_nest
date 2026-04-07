import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { emitWarning } from 'process';
import { IsEmail } from 'class-validator';

@Injectable()
export class UsersService {
  // 리포지토리 액세스
  // 제네릭 타입 User를 사용하여 Repo 지정
  // InjectRepository는 nestjs/typeorm에서, 
  // Repository 타입은 typeorm에서, 
  // Entity는 Entity 파일에서 임포트
  constructor(@InjectRepository(User) private repo: Repository<User>){  }
  create(email: string, password: string) {
    // create()를 호출하고 사용자 엔터티 인스턴스 생성
    const user = this.repo.create({ email, password })
    // 엔터티 인스턴스에 save
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id){
      return null;
    }
    return this.repo.findOne({where: {id}});
  }

  find(email: string) {
    return this.repo.find({where: {email}});
  }

  async update(id: number, attrs: Partial<User>) {    // 업데이트의 대상: 사용자 id
    const user = await this.findOne(id);    // 비동기작업
    if (!user){
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);   // 변경(업데이트)하고자 하는 객체 복사
    return this.repo.save(user);
  }   

  async remove(id: number) {    // 엔터티에서 작동하는 메서드, 후크를 사용하기 위함
    const user = await this.findOne(id);
    if (!user){
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}

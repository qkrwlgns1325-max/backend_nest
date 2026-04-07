import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Decrypt } from './decrypt.entity';
import { CreateDecryptDto } from './dtos/create-decrypt.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class DecryptService {
  constructor (
    @InjectRepository(Decrypt) private repo: Repository<Decrypt>
  ) { }

  createEstimate({ tool, family, description }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
      .where('tool = :tool', { tool })
      .andWhere('family = :family', { family })
      .andWhere('description = :description', { description })
      .limit(5)         // 같은 패밀리를 가진 이름으로 5개 출력
      .getRawMany();
  }

  findAllApproved() {
    return this.repo.find({ where: { approved: true } });
  }

  findAllUnapproved() {
    return this.repo.find({ where: { approved: false } });
  }

  findAllByUserId(userId: number) {
    return this.repo.find({ where: { user: { id: userId } } });
  }

  async findApprovedById(id: number) {
    const decrypt = await this.repo.findOne({ where: { id, approved: true } });
    if (!decrypt) {
      throw new NotFoundException('decrypt not found');
    }
    return decrypt;
  }

  create(decryptDto: CreateDecryptDto, user: User) {
    const decrypt = this.repo.create(decryptDto);   // 복호화 키 엔터티 인스턴스 생성
    decrypt.user = user;  // 복호화 키 엔터티 인스턴스에 사용자 속성 설정
    return this.repo.save(decrypt);  // 복호화 키 엔터티 인스턴스 저장(repo에 저장하는 method)
  }

  async changeApproval(id: string, approved: boolean){
    const decrypt = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!decrypt) {
      throw new NotFoundException('decrypt not found');
    }

    decrypt.approved = approved;     // changeApproval 함수에 전달된 approved의 새로운 값
    return this.repo.save(decrypt);  // 업데이트된 복호화 키 저장
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('decrypt not found');
    }
    return { message: 'Decrypt removed successfully' };
  }

  // async removeUnapproved(id: number, approved: boolean) {
  //   const decrypt = await this.repo.findOne({ where: { approved: approved } });
  //   if (!decrypt) {
  //     throw new NotFoundException('unapproved decrypt not found');
  //   }
  //   await this.repo.delete(id);
  //   return { message: 'Unapproved decrypt removed successfully' };
  // }

  async update(id: number, attrs: Partial<Decrypt>) {
    const decrypt = await this.repo.findOne({ where: { id } });
    if (!decrypt) {
      throw new NotFoundException('decrypt not found');
    }
    Object.assign(decrypt, attrs);
    return this.repo.save(decrypt);
  }
}
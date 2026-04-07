import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor (
    @InjectRepository(Report) private repo: Repository<Report>
  ) { }

  createEstimate({ year, family, hash, type, region, lng, lat, ip}: GetEstimateDto) {
    return this.repo.createQueryBuilder()
      .select(['lng', 'lat', '((lng - :lng) * (lng - :lng) + (lat - :lat) * (lat - :lat)) AS distance'])  // 경도와 위도 차이의 제곱합으로 유클리드 거리의 제곱 계산
      .where('year = :year', { year })
      .andWhere('family = :family', { family })  // Injection 취약점을 없애기 위해 객체에 family 속성의 값을 삽입
      .andWhere('hash = :hash', { hash })
      .andWhere('type = :type', { type })   // where를 여러 번 호출할 경우 오버라이드를 방지하기 위해 다른 구문 사용
      .andWhere('region = :region', { region })
      .andWhere('lng - :lng BETWEEN -2 AND 2', { lng })
      .andWhere('lat - :lat BETWEEN -2 AND 2', { lat })
      .andWhere('ip = :ip', { ip })
      .andWhere('approved IS TRUE')
      .orderBy('distance', 'ASC')  // 계산된 거리를 기준으로 정렬
      .limit(3)
      .getRawMany();
  }

  // findAll() {
  //   return this.repo.find();
  // }

  findAllApproved() {
    return this.repo.find({ where: { approved: true } })
      .then(reports => reports.map(report => {
        const { approved, ...rest } = report;
        return rest;
      }));
  }

  findAllByUserId(userId: number) {
    return this.repo.find({ where: { user: { id: userId } } });
  }

  async findApprovedById(id: number) {
    const report = this.repo.findOne({ where: { id, approved: true } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    return report;
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);   // 보고서 엔터티 인스턴스 생성
    report.user = user;  // 보고서 엔터티 인스턴스에 사용자 속성 설정
    return this.repo.save(report);  // 보고서 엔터티 인스턴스 저장(repo에 저장하는 method)
  }

  // 적절한 보고서를 찾아서 approved 속성을 업데이트, /reports/:id 에서 사용
  async changeApproval(id: string, approved: boolean){
    const report = await this.repo.findOne({ where: { id: parseInt(id) } 
    });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;     // changeApproval 함수에 전달된 approved의 새로운 값
    return this.repo.save(report);  // 업데이트된 보고서 저장
  }
}


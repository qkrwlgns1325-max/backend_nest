import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    createEstimate({ year, family, hash, type, region, lng, lat, ip }: GetEstimateDto): Promise<any[]>;
    findAllApproved(): Promise<Report[]>;
    findAllByUserId(userId: number): Promise<Report[]>;
    findApprovedById(id: number): Promise<Report>;
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
}

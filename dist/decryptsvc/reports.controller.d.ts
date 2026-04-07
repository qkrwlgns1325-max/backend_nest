import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    getEstimate(query: GetEstimateDto): Promise<any[]>;
    findApproved(): Promise<import("./decrypt.entity").Report[]>;
    findAllByUserId(userId: string): Promise<import("./decrypt.entity").Report[]>;
    findApprovedById(id: string): Promise<import("./decrypt.entity").Report>;
    createReport(body: CreateReportDto, user: User): Promise<import("./decrypt.entity").Report>;
    approveReport(id: string, body: ApproveReportDto): Promise<import("./decrypt.entity").Report>;
}

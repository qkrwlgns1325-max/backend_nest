import { CreateDecryptDto } from './dtos/create-decrypt.dto';
import { DecryptService } from './decrypt.service';
import { User } from '../users/user.entity';
import { DecryptDto } from './dtos/decrypt.dto';
import { ApproveDecryptDto } from './dtos/approve-decrypt.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class DecryptController {
    private decryptService;
    constructor(decryptService: DecryptService);
    getEstimate(query: GetEstimateDto): Promise<any[]>;
    findAllUnapproved(): Promise<import("./decrypt.entity").Decrypt[]>;
    findApproved(): Promise<import("./decrypt.entity").Decrypt[]>;
    findAllByUserId(userId: string): Promise<import("./decrypt.entity").Decrypt[]>;
    findApprovedById(id: string): Promise<import("./decrypt.entity").Decrypt>;
    createDecrypt(body: CreateDecryptDto, user: User): Promise<import("./decrypt.entity").Decrypt>;
    approveDecrypt(id: string, body: ApproveDecryptDto): Promise<import("./decrypt.entity").Decrypt>;
    deleteApproved(id: string): Promise<{
        message: string;
    }>;
    updateDecrypt(id: string, body: Partial<DecryptDto>): Promise<import("./decrypt.entity").Decrypt>;
    deleteUnapproved(id: string): Promise<{
        message: string;
    }>;
}

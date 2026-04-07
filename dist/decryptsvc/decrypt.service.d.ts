import { Repository } from 'typeorm';
import { Decrypt } from './decrypt.entity';
import { CreateDecryptDto } from './dtos/create-decrypt.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class DecryptService {
    private repo;
    constructor(repo: Repository<Decrypt>);
    createEstimate({ tool, family, description }: GetEstimateDto): Promise<any[]>;
    findAllApproved(): Promise<Decrypt[]>;
    findAllUnapproved(): Promise<Decrypt[]>;
    findAllByUserId(userId: number): Promise<Decrypt[]>;
    findApprovedById(id: number): Promise<Decrypt>;
    create(decryptDto: CreateDecryptDto, user: User): Promise<Decrypt>;
    changeApproval(id: string, approved: boolean): Promise<Decrypt>;
    remove(id: number): Promise<{
        message: string;
    }>;
    update(id: number, attrs: Partial<Decrypt>): Promise<Decrypt>;
}

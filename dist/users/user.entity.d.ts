import { Report } from '../reports/report.entity';
import { Decrypt } from '../decryptsvc/decrypt.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    admin: boolean;
    reports: Report[];
    decrypts: Decrypt[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}

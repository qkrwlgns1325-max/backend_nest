import { User } from '../users/user.entity';
export declare class Report {
    id: number;
    approved: boolean;
    family: string;
    region: string;
    lng: number;
    lat: number;
    year: number;
    type: string;
    hash: string;
    ip: string;
    user: User;
}

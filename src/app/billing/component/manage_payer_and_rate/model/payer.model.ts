import { BaseModel } from 'src/app/models/common';

export class Payer extends BaseModel {
    payerId: number;
    payerName: string;
    billToName: string;
    payerCode: string;
    payerDescription: string;
    email: string;
    phone: string;
    fax: string;
    npi: string;
    fedId: string;
    etin: string;
    taxonomy: string;
    medicaidId: string;
    isActive: number;
    createdOn: string;
    createdBy: number;
}











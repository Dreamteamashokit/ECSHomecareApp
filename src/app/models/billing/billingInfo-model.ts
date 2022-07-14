import { BaseModel } from 'src/app/models/common';

export class billingInfo extends BaseModel {
    billingId: number;
    payerId: number;
    Type: string;
    dueDate: string;
    billToName: string;
}
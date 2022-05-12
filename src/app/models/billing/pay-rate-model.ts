import { BaseModel } from 'src/app/models/common';

export class PayRateModel extends BaseModel {
    payer: number;
    payType: number;
    unit: number;
    rate: number;
    taxRate: number;
    effectiveFrom: string;
    effectiveTo: string;
    serviceCode: string;
    billCode: string;
    revenueCode: string;
    notes: string;
}
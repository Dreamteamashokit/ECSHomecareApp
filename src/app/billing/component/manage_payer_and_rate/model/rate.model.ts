import { BaseModel } from 'src/app/models/common';
import { Payer } from './payer.model';
import { Type } from './type.model';

export class RateModel extends BaseModel {
    payer: Payer;
    type: Type;
    unit: number;
    per: string;
    rate: number;
    mutualOrGroup: boolean;
    placeOfService: number;

    serviceCode: string;
    billCode: string;
    modifiers: string;

    effectiveDate: string;
    endDate: string;
    revenueCode: string;
    
    taxRate: number;
    note: string;   
}













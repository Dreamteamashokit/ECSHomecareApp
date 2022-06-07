import { BaseModel } from 'src/app/models/common';
import { Payer } from './payer.model';
import { Type } from './type.model';

export class RateModel extends BaseModel {
    // payer: Payer;
    // type: Type;
    // unit: number;
    // per: string;
    // rate: number;
    // mutualOrGroup: boolean;
    // placeOfService: number;

    // serviceCode: string;
    // billCode: string;
    // modifiers: string;

    // //effectiveDate: string;
    // //endDate: string;
    // revenueCode: string;

    // taxRate: number;
    // note: string;

    rateid: number;
    payerid: number;
    serviceCode: string;
    type: number;
    billCode: string;
    revenueCode: string;
    taxRate: number;
    validFrom: string;
    validTo: string;
    hourly: number;
    livein: number;
    visit: number;
    unit: string;
    modifiers1: string;
    modifiers2: string;
    modifiers3: string;
    modifiers4: string;
    placeOfService: string;
    mutualGroup: boolean;
    notes: string;
    createdBy: number;
}













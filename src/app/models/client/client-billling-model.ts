import { BaseModel } from "../common";

export class ClientBilling extends BaseModel {
    billTo:Date;
    fromDate:Date;
    toDate: Date;
    clientId:number;
    authNumber:number;
    serviceCode:string;
    notes:string;
}
export class billingPayerRate {
    billingId: number;
    payerId: number;
    payerName: string;
    clientId: number;
    rateId: number;
    billCode:string;
    taxRate:number;
    validFrom:Date;
    validTo:Date;
    calculateUnit:number;
    billTotal:number;
    billingStatus:string;
}
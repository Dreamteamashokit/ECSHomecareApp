import { BaseModel } from 'src/app/models/common';


export class EmployeeRateModel extends BaseModel {
    rateId:number;
    effectiveDateTime: string;
    endDateTime: string;
    effectiveDate: Date;
    endDate: Date; 
    description: string;
    note: string;
    hourly: number;
    liveIn: number;
    visit: number;
    overHourly: number;
    overLiveIn: number;
    overVisit: number;
    applyRateCheck: boolean;
    optionalHour: number;
    optionalAddHour: number;
    mileage: number;
    travelTime: number;
    gas: number;
    extra: number;
    payerId: number;
    clientId: number;
    empId: number;
}






export class EmpRate {
    active: boolean;
    effectiveDates: string;
    ragularrate: string;
    overTimeRate: string;
    discription: string;
}















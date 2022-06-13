import { BaseModel } from "../common";

export class ClientBilling extends BaseModel {
    // billTo:Date;
    // fromDate:Date;
    // toDate: Date;
    // clientId:number;
    // authNumber:number;
    // serviceCode:string;
    // notes:string;

  billingId: number;
  payerId: number;
  contractClientId: number;
  authorizationNumber: string;
  fromDate: string;
  toDate: string;
  hoursAuthorizedPerWeek: string;
  hoursAuthorizedPerMonth: string;
  hoursAuthorizedEntirePeriod: string;
  serviceCode: number;
  occurencesAuthorizedPerWeek: string;
  occurencesAuthorizedPerMonth: string;
  occurencesAuthorizedEntirePeriod: string;
  daysOfWeekNotes: string;
  brServiceCode_SAT: number;
  brServiceCode_SUN: number;
  brServiceCode_MON: number;
  brServiceCode_TUE: number;
  brServiceCode_WED: number;
  brServiceCode_THU: number;
  brServiceCode_FRI: number;
  quantity_SAT: number;
  quantity_SUN: number;
  quantity_MON: number;
  quantity_TUE: number;
  quantity_WED: number;
  quantity_THU: number;
  quantity_FRI: number;
  periodEpisode_Notes: string;
  createdBy: number;
}

export interface ServiceCode {
  rateId: number
  serviceCode: string
  payerId: number
}


export interface RateViewModel{
    rateId:number
		payerId:number
		payerName:string
		serviceCode:string
		billCode:string
		revenueCode:string
		validFrom:Date
		validTo:Date
		unit:string
		rate:number 
		hourly:number
		visit:number
		liveIn:number
		type:number
		MutualGroup:string
		Modifiers1:string
		Modifiers2:string
		Modifiers3:string
		Modifiers4:string
		Notes:string
		CreatedBy:string
		CreatedOn:Date
		IsActive:number
}
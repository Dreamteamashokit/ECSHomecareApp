
export class MeetingRate {
  
    public meetingRateId : number;
    public meetingId : number;
    public billingCode : string;
    public billingUnits : number;
    public billingRate : number;    
    public billingTotal : number;    
    public billingStatus : number;
    public billingTravelTime : number;
    public payrollUnitsPaid : number;
    public payrollPayRate : number;
    public payrollPayTotal : number;
    public payrollPayStatus : number;

    public payrollMileage : number;
    public payrollPublicTrans:number;
    public payrollMisc : number;
    public payrollDoNotPay:boolean;
    public sentPayrollDate:string;
    public isActive:boolean;
}
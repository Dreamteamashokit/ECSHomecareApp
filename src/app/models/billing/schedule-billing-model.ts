export class SearchSchedule {
    fromDate: Date;
    toDate: Date;
    payerId: number;
    empId: number;
    clientId: number;
}

export class ScheduleBillingModel {
    scheduleRateId: number;
    payerId: number;
    empId: number;
    clientId: number;
    meetingDate: Date;
    payerName: string;
    empName: string;
    clientName: string;
    billingCode: string;
    billingUnits: number;
    billingRate: number;
    billingTotal: number;
    paidAmount: number;
    balanceAmount: number;
    scheduleStatus: number;
    billingStatus: number;
    payrollStatus: number;
}
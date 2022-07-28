
export interface InvoiceView {
    invoiceId: number;
    invoiceNo: string;
    clientId: number;
    clientName: string;
    payerId: number;
    payerName: string;
    amounts: number;
    balanceAmont: number;
    serviceDate: string;
    invoiceDate: string;
    invoiceStatus: number;
    scheduleList: ScheduleInvoiceModel[];
}

export interface ScheduleInvoiceModel {

    isChecked:boolean;
    invoiceId: number;
    scheduleRateId: number;
    invoiceAmount: number;
    invoiceStatus: number;
    paymentStatus: number;
    invoiceNo: string;
    scheduleCost: number;
    meetingId: number;
    payerId: number;
    empId: number;
    clientId: number;
    invoiceDate: string;
    serviceDate: string;
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
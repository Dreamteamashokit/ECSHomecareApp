import { BaseModel } from "../common";
export class ClientCompliance extends BaseModel {
    clientComplianceId: number;
    dueDate: Date;
    completedOn: Date;
    category: number;
    screenDate: Date;
    subCategory: number;
    signedDate: Date;
    mDOrderFdate: Date;
    mDOrderEDate: Date;
    isReceived: number;
    attachFile: number;
    empId: number;
    officeUserId: number;
    isNotifyViaText: number;
    isNotifyViaScreen: number;
    isNotifyViaEmail: number;
    notes: string;
    status: string;
}
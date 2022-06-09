import { BaseModel } from 'src/app/models/common';
export class ClientContactLog extends BaseModel {
    contactlogId: number;
    officeUserId: number;
    empId: number;
    reason: string;
    callDateTime: Date;
    CallLogDateTime:string;
    scheduleDate: Date;
    followUpDate: Date;
    issue: string;
    actionTaken: string;
    notes: string;
    isFollowUp: boolean;
    isSchedule: boolean;
}
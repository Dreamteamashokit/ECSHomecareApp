import { BaseModel } from 'src/app/models/common';
export class ComplianceModel extends BaseModel {
    complianceId: number;
    dueDate: Date;
    completedOn?: Date;
    nurseId: number;
    categoryId: number;
    codeId: number;
    category: string;
    code: string;
    result: string;
    notes: string;
    isCompleted: boolean;
    isStatus: number;
    documentId:number;
    statusName: string;
    ComplianceName:string;
}

export class ComplianceListModel {
    objThreeLatestCompletedCompliance:ComplianceModel[];
    objThreeLatestPendingCompliance:ComplianceModel[];
}
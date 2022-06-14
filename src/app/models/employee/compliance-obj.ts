import { BaseModel } from 'src/app/models/common';
export class ComplianceModel extends BaseModel {
    complianceId: number;
    dueDate: Date;
    completedOn?: Date;
    nurse: number;
    categoryId: number;
    codeId: number;
    category: string;
    code: string;
    result: string;
    notes: string;
    isCompleted: boolean;
}

import { BaseModel } from 'src/app/models/common';

export class ClientNote extends BaseModel {
    notesId: number;
    notesTypeId: number;
    NotesType:string;
    notes: string;
    officeUserId: number;
    empId: number;
    notifyTypeId: number;
    notifyTypeId1: number;
    notifyTypeId2: number;
    notifyTypeId3: number;
}

	
	import { BaseModel } from 'src/app/models/common';
	
    export class EmpDeclinedCase extends BaseModel {
        repotedDate: string;
        clientId: number;
        caseTypeId: number;
        declineReason: string;
        assignmentStart: string;
        note: string;
        day: number;
        week: number;
        clientName: string;
        caseTypeName: string;
    }
	
	


export class AvailbilityRequest {
    caseId: number;
    empTypeId: number;
    payTypeId: number;
    term: string;
    fromDate: string;
    toDate: string;
    timeIn: string;
    timeOut: string;
    provisionsList: number[];
}
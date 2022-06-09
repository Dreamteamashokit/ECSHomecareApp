import { BaseModel } from 'src/app/models/common';

export class Attendance extends BaseModel{
    public attendanceId: number;
    public empId: number;
    public reason: number;
    public reasonName: string;
    public startDate: string;
    public endDate: string;
    public notes: string;
    constructor(_attendanceId : number, _empId : number, _reason : number, _startDate : string, _endDate : string, _notes : string)
    {
        super();
        this.attendanceId = _attendanceId;
        this.empId = _empId;
        this.reason = _reason;
        this.startDate = _startDate;     
        this.endDate = _endDate;
        this.notes = _notes;
    }
}



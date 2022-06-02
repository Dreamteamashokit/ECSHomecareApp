import { Time } from "@angular/common";

export class MeetingInfo {
  
    public meetingId : number;
    public clientId : number;
    public userId : number;
    public empList : number[];    
    public empId : number;    
    public meetingDate : string;
    public fromDate : string;
    public toDate : string;
    public startTime : string;
    public endTime : string;
    public meetingNote : string;
    
    constructor(_meetingId : number, _empList : number[],_empId : number, _clientId : number,_startTime:string,_endTime:string, _meetingDate : string, _meetingNote : string)
    {
        this.meetingId = _meetingId;
        this.empList = _empList;
        this.empId = _empId;
        this.clientId = _clientId;
        this.startTime = _startTime;
        this.endTime = _endTime;        
        this.meetingDate = _meetingDate;     
        this.meetingNote = _meetingNote;
    }
}

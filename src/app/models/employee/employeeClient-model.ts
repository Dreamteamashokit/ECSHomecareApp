export class employeeclientList 
{
    ClientId:number;
    UserId: number;
    FirstName:string;
    MiddleName:string;
    LastName:string;
    MeetingDate:string;
    MeetingStartTime:string;
    MeetingEndTime:string;
    //clientAddress:any;
    FlatNo:string;
    Address:string;
    City:string;
    Country:string;
    State:string;
    ZipCode:string;
    Longitude:string;
    Latitude:string;
}

export class ClockinViewModel
{
    ClockId:number;
    UserId:number;
    ClockInTime:Date;
    ClockOutTime:Date;
    Notes:string;
}
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
    clientAddress:any;
}

export class clientAddress
{
    AddressId:number;
    FlatNo:string;
    Address:string;
    City:string;
    Country:string;
    State:string;
    ZipCode:string;
    Longitude:string;
    Latitude:string;
}
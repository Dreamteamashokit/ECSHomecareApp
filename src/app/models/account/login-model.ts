
export class LoginModel {
    loginId: number;
    userName: string;
    password: string;
    isActive: boolean;
}

export class UserModel {
    userId: number;
    loginInId: number;
    userTypeId:number;
    userName: string;  
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    latitude:number;
    longitude:number;
}

export class Externalsign{
    SSN:string;
    MobileNo:string;
}

export class ExternalUserModel {
    userId: number;
    userTypeId:number;
    userName: string;  
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    latitude: number;
    longitude: number;    
}

export class HHAClockInMode{
    userId: number;
    Type:number;
    ClockInTime:Date;
    MeetingId:number;
    DateString:string;
}

export class HHAClockout{
    userId: number;
    Type:number;
    Notes:string;
    BedBath:boolean;
    SpongeBath:boolean;
    Footcare:boolean;
    Skincare:boolean;
    ClientSignature:string;
    HHAUserSignature:string;
    ClockOutTime:Date;
    ClockInTime:Date;
    DateString:string;
    MeetingId:number;
    
}
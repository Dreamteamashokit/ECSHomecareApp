
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
}

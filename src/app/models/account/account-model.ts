
import { BaseModel } from 'src/app/models/common';

export class AccountUserModel extends BaseModel {
   
    userKey: string;
    userType: number;
    userName: string;
    userPassword: string;
    ssn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    email: string;
    cellPhone: string;
    homePhone: string;
    emgPhone: string;
    emgContact: string;
    gender: number;
    maritalStatus: number;
    ethnicity: number;
    supervisorId: number;
   
    

}
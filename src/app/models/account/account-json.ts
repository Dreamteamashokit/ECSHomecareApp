import { BaseJson } from 'src/app/models/common';	

export class AccountJson extends BaseJson {
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
    genderName: string;
    maritalStatus: number;
    maritalStatusName: string;
    ethnicity: number;
    ethnicityName: string;
    supervisorId: number;
    supervisor: string;
}
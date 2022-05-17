
import { BaseModel } from 'src/app/models/common';
export class AccountUserModel extends BaseModel {
   
    userKey: string;
    userType: number;
    userName: string;
    userPassword: string;
    ssn: string;
    title: string;
    organization: string;
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
    notes: string;
    homeAddress: AddressModel = new AddressModel();
}


export class AddressModel {
    public addressId: number;
    public addressType: number;
    public owner: string;
    public flatNo: string;
    public address: string;
    public country: string;
    public state: string;
    public city: string;
    public zipCode: string;
    public latitude:number;
    public longitude:number;

}

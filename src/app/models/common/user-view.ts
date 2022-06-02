import { AddressView } from 'src/app/models/common/address-view';
export class UserView {  
        id: number;
        userType: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        cellPhone: string;
        homePhone: string;
        emergPhone: string;
        emergContact: string;
        address: AddressView; 
}

export interface NameClass {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
}
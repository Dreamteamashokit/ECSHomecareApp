import { BaseModel } from 'src/app/models/common';

export class ContactModel extends BaseModel {
    contactType: number;
    name: string;
    relationship: string;
    phone: string;
    email: string;
}

export class ProviderModel extends BaseModel {
    contactType: number;
    title: string;
    firstName: string;
    lastName: string;
    nPINumber: string;
    address: string;
    relationship: string;
    city: string;
    license: string;
    licenseExpires: string;
    email: string;
    phone: string;
    fax: string;
    state: string;
    zip: string;
}
import { BaseModel } from "src/app/models/common";

export class LocationModel extends BaseModel {
    locationId: number;
    locationName: string;
    billingName: string;
    contact: string;
    email: string;
    address: string;
    phone: string;
    fax: string;
    city: string;
    state: string;
    zipCode: string;
    isBilling: boolean;
    description: string;
    taxId: string;
    legacyId: string;
    nPI: string;
    iSA06: string;
}
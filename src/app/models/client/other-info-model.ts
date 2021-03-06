
import { BaseModel } from "src/app/models/common";

export class OtherInfoModel extends BaseModel {
    casA3: string;
    contactId: string;
    insuranceGrp: string;
    isMedications: boolean;
    isDialysis: boolean;
    isOxygen: boolean;
    isAids: boolean;
    isCourtOrdered: boolean;
    isResuscitate: boolean;
    
    flowRate: string;
    reunionLocations: string;
    linkedClients: string;
    shelterName: string;
    talCode: string;
    shelter: string;
    facility: string;
    room: string;

    serviceRequestDate: string;
    careDate: string;
    dischargeDate: string;

    serviceRequestDateTime: Date;
    careDateTime: Date;
    dischargeDateTime: Date;

 
    notes: string;
    allergies: string;
}
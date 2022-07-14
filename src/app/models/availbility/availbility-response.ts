export class AvailbilityReponse {
    empId: number;
    empName: string;
    latitude: number;
    longitude: number;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    distance:number;
    meetingList: EmpAppointment[];
    flatNo: string;
}

export class EmpAppointment {
    clientId: number;
    clientName: string;
    meetingId: number;
    meetingDate: string;
    startTime: string;
    endTime: string;
}


export class ClientGeoProvisions {
    clientId: number;
    latitude: number;
    longitude: number;
    provisions: number[];
    userName: string;
    flatNo: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    fullAddress:string;
}
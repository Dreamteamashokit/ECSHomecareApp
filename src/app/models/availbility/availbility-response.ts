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
    meetingList: EmpAppointment[];
}

export class EmpAppointment {
    clientId: number;
    clientName: string;
    meetingDate: string;
    startTime: string;
    endTime: string;
}
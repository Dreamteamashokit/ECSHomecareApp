export class ClientMeeting {
    clientId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    contact: string;
    meetings: ClMeeting[];
}

export class ClMeeting {
    empId: number;
    empName: string;
    meetingId: number;
    meetingDate: string;
    startTime: string;
    endTime: string;
    meetingNote: string;
}

export class ClientFilter {
    status: number;
    state: string;
    coordinator: number;
    payer: number;   
    empType: number;
    constructor(status: number,state: string,coordinator: number,payer: number,empType: number) {
        this.status = status;
        this.state = state;
        this.coordinator = coordinator;
        this.payer = payer;
        this.empType = empType;
      }  
}



export class ClientResult {
    clientId: number;
    userKey: string;
    sSN: string;
    firstName: string;
    middleName: string;
    lastName: string;
    cellPhone: string;
    address: string;
    state: string;
    city: string;
    zipCode: string;
}

import { BaseModel } from 'src/app/models/common';

export class Incident  extends BaseModel {
    public incidentId: number;
    public empId: number;
    public clientId: number;
    public incidentDate: string;
    public incidentDetail: string;
    public incidentDateTime: Date;
    
    constructor(_incidentId : number, _empId : number, _clientId : number, _incidentDate : string, _incidentDetail : string)
    {
        super();
        this.incidentId = _incidentId;
        this.empId = _empId;
        this.clientId = _clientId;
        this.incidentDate = _incidentDate;     
        this.incidentDetail = _incidentDetail;
    }
}
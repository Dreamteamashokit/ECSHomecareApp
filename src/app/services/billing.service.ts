import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { billingPayerRate } from '../models/billing/billingPayerRate-model';
import { ScheduleBillingModel, SearchSchedule ,ClientSchedule} from 'src/app/models/billing/schedule-billing-model';
import { payerlist } from '../models/billing/payer-model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private _http: HttpClient) { }
  getAllScheduleBilling() {
    
    return this._http.get<APIResponse<ClientSchedule[]>>(environment.domain + "/api/Billing/getAllScheduleBilling");
  }  

  getScheduleBilling(search:SearchSchedule) {
    
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post<APIResponse<ClientSchedule[]>>(environment.domain + "/api/Billing/getScheduleBilling", search,httpOptions);       
    
  }

  GetBillingPayerRate(payerId:number,clientId:number,meetingId:number) {
    return this._http.get<APIResponse<billingPayerRate>>(environment.domain + "/api/Billing/GetBillingPayerRate" + "/" + payerId+ "/" + clientId + "/" + meetingId);
  }

  GetPayerListByclientIdAndmeetingId(clientId:number,meetingId:number) {
    return this._http.get<APIResponse<payerlist[]>>(environment.domain + "/api/Billing/GetPayerListByclientIdAndmeetingId" + "/" + clientId + "/" + meetingId);
  }

}

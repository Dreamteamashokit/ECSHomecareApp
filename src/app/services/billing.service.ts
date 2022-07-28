import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { billingPayerRate } from '../models/billing/billingPayerRate-model';
import { payerlist } from '../models/billing/payer-model';
import { ScheduleBillingModel, SearchSchedule ,ClientSchedule,UpdateBillingSchedule,InvoiceModel} from 'src/app/models/billing/schedule-billing-model';
import { ScheduleInvoiceModel,InvoiceView} from 'src/app/models/billing/invoice-model';


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

  

  updateSchedule(_obj : UpdateBillingSchedule){     

    
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
        return this._http.post<APIResponse<number>>(environment.domain + "/api/Billing/updateSchedule", _obj,httpOptions);                 
  }

  createInvoice(req : InvoiceModel){     

    
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
        return this._http.post<APIResponse<number>>(environment.domain + "/api/Billing/createInvoice", req,httpOptions);                 
  }

  getScheduleInvoice() {

    return this._http.get<APIResponse<InvoiceView[]>>(environment.domain + "/api/Billing/getScheduleInvoice");
  
  }  
  







}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { GenerateInvoice } from 'src/app/models/generate-invoice';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { Invoice } from '../models/invoice';
import { RateModel } from '../billing/component/manage_payer_and_rate/model/rate.model';
import { ClientBilling, ServiceCode,RateViewModel } from '../models/client/client-billling-model';
import { billingInfo } from '../models/billing/billingInfo-model';
import { billingStatus } from '../models/billing/billing-status';
import { payrollStatus } from '../models/billing/Payroll-status';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http : HttpClient) { }

  generateinvoice(invoice : GenerateInvoice){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + environment.generateinvoiceurl, invoice,httpOptions);            
  } 

  getInvoiceList()
  {
    return this._http.get<APIResponse<Invoice[]>>(environment.domain + environment.getinvoicelisturl);
  } 

  getInvoicebyId(invId : string)
  {
    return this._http.get<APIResponse<Invoice>>(environment.domain + environment.getinvoicebyidurl + '/' + invId);
  } 

  payinvoice(invoiceid : string){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + environment.payinvoicebyidurl + '/' + invoiceid, null,httpOptions);            
  }

  addUpdatePayerRate(_obj:RateModel) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };

    return this._http.post(environment.domain +  "/api/Invoice/AddUpdatePayerRate", _obj, httpOptions)

  }

  AddUpdateBilling(_obj:ClientBilling) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };

    return this._http.post<APIResponse<object>>(environment.domain +  "/api/Invoice/AddUpdateBilling", _obj, httpOptions)
  }

  GetActiveBillAndExpiredBill(status:boolean,clientId:number) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };

    return this._http.post<APIResponse<ClientBilling[]>>(environment.domain + `/api/Invoice/GetActiveBillAndExpiredBill/${status}/${clientId}`, {}, httpOptions)
  }

  deleteBilling(billingId : number) {
    return this._http.delete<APIResponse<Object>>(environment.domain + `/api/Invoice/DeleteBillng?billingId=${billingId}`)
  }
  
  DeleteRate(rateId:number){
    return this._http.delete<APIResponse<Object>>(environment.domain + `/api/Invoice/DeleteRate?rateId=${rateId}`)
  }

  getBillingDetailsByBillingId(billingId: number) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post<APIResponse<ClientBilling>>(environment.domain +  `/api/Invoice/GetBillingDetailsByBillingId/${billingId}`, {}, httpOptions)
  }

  getServiceCodeByPayerId(payerId: number) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post<APIResponse<ServiceCode[]>>(environment.domain +  `/api/Invoice/GetServiceCodeByPayerId/${payerId}`, {}, httpOptions);
  }

  GetPayerRateList(){
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.get<APIResponse<RateViewModel[]>>(environment.domain +  `/api/Invoice/GetPayerRateList/`, {});
  }


  GetPayerRateDetails(rateId:number){
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post<APIResponse<RateViewModel[]>>(environment.domain +  `/api/Invoice/GetPayerRateDetails/${rateId}`, {}, httpOptions);
  }


  GetBillingSummaryInfo(userId:number){
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.get<APIResponse<billingInfo>>(environment.domain +  `/api/Billing/GetBillingSummaryInfo/${userId}`, {});
  }

  GetBillingStatus(){
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.get<APIResponse<billingStatus[]>>(environment.domain +  `/api/Billing/GetBillingStatusList`, {});
  }


  GetPayrollStatus(){
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.get<APIResponse<payrollStatus[]>>(environment.domain +  `/api/Billing/GetPayrollStatusList`, {});
  }

}

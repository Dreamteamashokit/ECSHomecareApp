import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { GenerateInvoice } from 'src/app/models/generateInvoice';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/APIResponse';
import { Invoice } from '../models/invoice';

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
}

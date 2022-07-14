import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PayerModel } from 'src/app/models/account/payer-model';
import { environment } from 'src/environments/environment.prod';

const httpOptionsObj = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization": "Bearer " + "qatest"
  }),
};
@Injectable()

  export class PayerService {
    selectedPayer: PayerModel;
    payers:PayerModel[];


constructor(private _http: HttpClient){}

postPayer(data: PayerModel){ 
  debugger;
  console.log(data);
  var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        };
    return this._http.post(environment.domain + "/api/Billing/addPayer", data,httpOptions);      
}

putPayer(data: PayerModel){ 
  var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        };
  return this._http.put(environment.domain + "/api/Billing/addPayer"+`${data.PayerId}`, data,httpOptions);      
}
  
getPayers(){
    return this._http.get(environment.domain + "/api");

  }

deletepayer(PayerId: number) {
    return this._http.delete(environment.domain + "/api"+`${PayerId}`);
}
  }
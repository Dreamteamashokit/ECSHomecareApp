import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import { Payer } from 'src/app/billing/component/manage_payer_and_rate/model/payer.model';
import { environment } from 'src/environments/environment.prod';

const httpOptionsObj = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization": "Bearer " + "qatest"
  }),
};
@Injectable({
  providedIn: 'root'
})

  export class PayerService {
 
constructor(private _http: HttpClient){}

addPayer(data: Payer){ 
  
  var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        };
    return this._http.post(environment.domain + "/api/Billing/addPayer", data,httpOptions);      
}

updatePayer(data: Payer){ 
  var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        };
  return this._http.post(environment.domain + "/api/Billing/updatePayer",data,httpOptions);      
}

  
getPayerList(){
  var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        };
    return this._http.get(environment.domain + "/api/Billing/getPayerList",httpOptions);

  }

  delPayer(PayerId: number) {
  const reqPara = new HttpParams({
    fromObject: {
      'PayerId': PayerId
    }
  });
  return this._http.delete(environment.domain + "/api/Billing/delPayer", { params: reqPara });
}








  }
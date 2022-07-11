import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders ,HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { LoginModel,UserModel,Externalsign,ExternalUserModel, HHAClockInMode, HHAClockout } from 'src/app/models/account/login-model';
import { AccountUserModel } from 'src/app/models/account/account-model';
import { PayerModel } from 'src/app/models/account/payer-model';
const httpOptionsObj = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
    providedIn: 'root'
  })
  export class PayerService {
    private userSubject: BehaviorSubject<UserModel>;
    public user: Observable<UserModel>;
    model:UserModel;
    HHAmodel:ExternalUserModel;
  
    constructor(private _http : HttpClient) {
      let localObj = localStorage.getItem('userData');
      if (localObj) { 
        this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(localObj));
        this.user = this.userSubject.asObservable();
      }
     }
  
     public get userValue(): UserModel {
      return this.userSubject.value;
  }
  getCurrentUser():UserModel {
    let localObj = localStorage.getItem('userData');
    if (localObj) {
      this.model = JSON.parse(localObj) as UserModel;
    }     
    return this.model;
}  

addPayer(_Obj: PayerModel){ 
      
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post<APIResponse<PayerModel>>(environment.domain + "/api", _Obj,httpOptions);            
  }

  getPayerList(PayerId : number){
    return this._http.get<APIResponse<PayerModel[]>>(environment.domain + "/api" + '/' + PayerId);

  }
  delpayerId(payerId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'payerId': payerId
      }
    });
    return this._http.delete(environment.domain + "/api", { params: reqPara });
  }
}
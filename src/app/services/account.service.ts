import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders ,HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { LoginModel,UserModel,Externalsign,ExternalUserModel } from 'src/app/models/account/login-model';
import { AccountUserModel } from 'src/app/models/account/account-model';
const httpOptionsObj = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;
  model:UserModel;

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

  signIn(_Obj: LoginModel){ 
    debugger;
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post<APIResponse<UserModel>>(environment.domain + "/api/Account/logIn", _Obj,httpOptions);            
  }



  signOut1(_userid: number){ 
    debugger;
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        };

    return this._http.post<APIResponse<UserModel>>(environment.domain + "/api/Account/logOut",httpOptions);            
  }

  signOut(_userId: number): Observable<any> {

    const params = new HttpParams()
      .append('UserId', _userId);     

    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    return this._http.post(environment.domain + "/api/Account/logOut",null,{
      headers: headers,
      params: params,
    });
  }

  ExternalsignIn(_Obj: Externalsign){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post<APIResponse<ExternalUserModel>>(environment.domain + "/api/Employee/ExternalLogin", _Obj,httpOptions);            
  }

  setCurrentUser(_model: UserModel) {
    localStorage.setItem('userData', JSON.stringify(_model));
  }
  
  setHHAUser(_model:ExternalUserModel){
    localStorage.setItem('HHAuserData', JSON.stringify(_model));
  }


  getCurrentUser():UserModel {
      let localObj = localStorage.getItem('userData');
      if (localObj) {
        this.model = JSON.parse(localObj) as UserModel;
      }     
      return this.model;
  }  



    addUser(_Obj: AccountUserModel){ 
      debugger;
      var headers_object = new HttpHeaders();
          headers_object.append('Content-Type', 'application/json');
          var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
          const httpOptions = {
            headers: headers_object
          }; 
      return this._http.post<APIResponse<UserModel>>(environment.domain + "/api/Account/addUser", _Obj,httpOptions);            
    }
  
  
    getUserList(userType: number) {
      debugger;
      return this._http.get<APIResponse<AccountUserModel[]>>(environment.domain + "/api/Account/getUser" + '/' + userType);
    }





}

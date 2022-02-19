import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { Client } from 'src/app/Model/Client';
import { MeetingDetails } from 'src/app/Model/MeetinDetails';
import { APIResponse } from '../Model/APIResponse';
import { ClientMeetings } from '../Model/ClientMeetings';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(private _http : HttpClient) { }

  saveclientinfo(cInfo : Client){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + environment.saveclienturl, cInfo,httpOptions);            
  }

  getClientList()
  {
    return this._http.get<APIResponse<Client[]>>(environment.domain + environment.getclienturl);
  } 

  getClientMeetingList(startdate : string, clientId : string)
  {
    return this._http.get<APIResponse<ClientMeetings[]>>(environment.domain + environment.getclientmeetingsurl + '/' + startdate + '/' + clientId);
  } 

  getClientMeetingbyId(clientId : string)
  {
    return this._http.get<APIResponse<ClientMeetings[]>>(environment.domain + environment.getclientmeetingsurl + '/2022-01-01/' + clientId);
  } 

  savescheduledmeeting(mInfo : MeetingDetails){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + environment.savescheduledclientmeeting, mInfo,httpOptions);            
  }

}

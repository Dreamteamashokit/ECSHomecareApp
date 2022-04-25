import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { LocationModel } from 'src/app/admin/model/location-model';

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
export class LocationService {

  constructor(private http: HttpClient) { }

  addLocation(model: LocationModel) {  
    return this.http.post(environment.domain + "/api/Location/addLocation", model, httpOptionsObj);
  }

  getLocationList() {  
    return this.http.get<APIResponse<LocationModel[]>>(environment.domain + "/api/Location/getLocationList");
  }

}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { LocationModel } from 'src/app/admin/model/location-model';
import { AvailbilityRequest } from 'src/app/models/availbility/availbility-request';
import { AvailbilityReponse } from 'src/app/models/availbility/availbility-response';
import{ AppSettings } from 'src/app/common/appSettings';
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

  private subscriptionKey:string; 

  // = "MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE"
  constructor(private http: HttpClient) {

this.subscriptionKey=AppSettings.subscriptionKey;

   }
  addLocation(model: LocationModel) {  
    return this.http.post(environment.domain + "/api/Location/addLocation", model, httpOptionsObj);
  }
  getLocationList() {  
    return this.http.get<APIResponse<LocationModel[]>>(environment.domain + "/api/Location/getLocationList");
  }
  searchAvailbility(model:AvailbilityRequest) {  
    return this.http.post<APIResponse<AvailbilityReponse[]>>(environment.domain + "/api/Location/searchAvailbility", model, httpOptionsObj);
  }




  getDistance(srcLatitude:number,srcLongitude:number,destLatitude:number,destLongitude:number){

    let apiURL = "https://atlas.microsoft.com/route/directions/json?";
    apiURL =apiURL+ "subscription-key=" + this.subscriptionKey + "&api-version=1.0&query="+ srcLatitude +","+ srcLongitude +":"+ destLatitude+","+ destLongitude +"&report=effectiveSettings";
    return this.http.get(apiURL);
}


getGeoPoint(address:string)
  {
   //debugger
    var query = "516 Alexander Rd, Princeton, NJ 08540, USA";
    //var subscriptionKey = "MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE";
    var language = "en-US";
    var postalCode = "POI";
    var country = "USA";
    let apiURL = "https://atlas.microsoft.com/search/address/json?";
    apiURL =apiURL+ "subscription-key=" + this.subscriptionKey + "&api-version=1.0&typeahead=true&language=" + language + "&extendedPostalCodesFor=" + postalCode + "&countrySet=" + country + "&query=" + address + "";
//alert(apiURL)
    return this.http.get(apiURL);

  }








}

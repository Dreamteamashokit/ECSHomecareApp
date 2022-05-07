import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Employee } from 'src/app/models/employee';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { Incident } from 'src/app/models/employee/incident';
import { Attendance } from 'src/app/models/employee/attendance';
import { Empstatus } from '../models/employee/empstatus';
import { AddressObj } from 'src/app/models/employee/address';
import { ComplianceObj } from 'src/app/models/employee/compliance-obj';
import { EmpRate, EmployeeRateModel } from 'src/app/models/employee/emp-rate'
import { SaveEmpDeclinedCase } from 'src/app/models/employee/save-emp-declined-case';
import { EmpDeclineCaseList } from 'src/app/models/employee/emp-decline-case-list';
import { EmployeeModel, EmployeeList } from 'src/app/models/employee/employee-model';
import { EmpAvailablityMappingModel } from '../models/Employee/EmpAvailablityMappingModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeapiService {

  constructor(private _http: HttpClient) { }



  addEmployee(empObj: EmployeeModel) {
    debugger;
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addEmployee", empObj, httpOptions);
  }


  getEmployeeListObj() {
    return this._http.get<APIResponse<EmployeeList[]>>("https://localhost:44359/api/Employee/getEmployeeListObj");
  }

  getEmployeeInfo(empID: string) {
    return this._http.get<APIResponse<Employee>>(environment.domain + "/api/Employee/getemployeebyId/" + empID);
  }

  deleteEmployee(empId: Number) {

    return this._http.get<APIResponse<string>>(environment.domain + "/api/Employee/deleteemployee/" + empId);
  }


  saveIncident(_req: Incident) {

    debugger;

    console.log(_req);
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addIncident", _req, httpOptions);
  }


  getIncidentList(empId: number) {

    return this._http.get<APIResponse<Incident>>(environment.domain + "/api/Employee/getIncidentList" + '/' + empId);
  }




  saveAttendance(_req: Attendance) {

    debugger;

    console.log(_req);
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addAttendance", _req, httpOptions);
  }


  getAttendanceList(empId: number) {

    return this._http.get<APIResponse<Incident>>(environment.domain + "/api/Employee/getAttendanceList" + '/' + empId);
  }




  SaveEmployeeStatus(_obj: Empstatus) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addStatus", _obj, httpOptions);

  }

  getEmpStatusList(empId: number) {
    return this._http.get<APIResponse<Empstatus>>(environment.domain + "/api/Employee/getEmpStatusList" + "/" + empId);
  }

  getAvailabilityList() {
    return this._http.get<APIResponse<any[]>>(environment.domain + "/api/Employee/getAvailabilityList");
  }

  saveAddress(_req: AddressObj) {
    debugger;
    console.log(_req);
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addAddress", _req, httpOptions);
  }

  geAddress(empId: number) {
    return this._http.get<APIResponse<AddressObj>>(environment.domain + "/api/Employee/getAddress" + '/' + empId);
  }

  saveCompliance(_req: ComplianceObj) {

    debugger;
    console.log(_req);
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addCompliance", _req, httpOptions);
  }


  geComplianceList(empId: number) {

    return this._http.get<APIResponse<ComplianceObj[]>>(environment.domain + "/api/Employee/getComplianceList" + '/' + empId);
  }



  SaveEmployeeRate(_obj: EmployeeRateModel) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addRate", _obj, httpOptions);

  }

  GetEmployeeRateLst(empId: number) {
    return this._http.get<APIResponse<EmpRate[]>>(environment.domain + "/api/Employee/getEmpRate" + '/' + empId);
  }


  SaveEmpDeclinedCase(_obj: SaveEmpDeclinedCase) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addEmpDeclinedCase", _obj, httpOptions);

  }

  GetEmpDeclinedCase(empId: number) {
    debugger
    return this._http.get<APIResponse<object>>(environment.domain + "/api/Employee/getEmpDeclinedcase" + '/' + empId);
  }

  UploadFile(formData: FormData) {
    debugger
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'text/plain;charset=UTF-8');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Common/UploadFile", formData, { reportProgress: true, observe: 'events' },);


  }

  getGeoPoint(addrsobj: AddressObj) {
    var address = addrsobj.address;  //"516 Alexander Rd, Princeton, NJ 08540, USA";   
    var subscriptionKey = "MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE";
    var language = "en-US";
    var postalCode = addrsobj.zipCode; //"POI";
    var country = addrsobj.country; //"USA";
    let apiURL = "https://atlas.microsoft.com/search/address/json?";
    apiURL = apiURL + "subscription-key=" + subscriptionKey + "&api-version=1.0&typeahead=true&language=" + language + "&extendedPostalCodesFor=" + postalCode + "&countrySet=" + country + "&query=" + address + "";
    return this._http.get<any>(apiURL);
  }

  saveAvailabilityMapping(_req: EmpAvailablityMappingModel) {
    debugger;
    console.log(_req);
    _req.availbilityId = Number(_req.availbilityId);
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addAvailabilityMapping", _req, httpOptions);
  }
}

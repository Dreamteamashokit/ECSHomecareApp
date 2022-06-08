import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { Incident } from 'src/app/models/employee/incident';
import { Attendance } from 'src/app/models/employee/attendance';
import { Empstatus } from '../models/employee/empstatus';
import { AddressObj } from 'src/app/models/employee/address';
import { ComplianceObj } from 'src/app/models/employee/compliance-obj';
import {EmpRate,EmployeeRateModel} from 'src/app/models/employee/emp-rate'
import { EmpDeclinedCase } from 'src/app/models/employee/save-emp-declined-case';
import { EmpDeclineCaseList } from 'src/app/models/employee/emp-decline-case-list';
import { EmployeeModel,EmployeeList } from 'src/app/models/employee/employee-model';
import { EmployeeJson } from 'src/app/models/employee/employee-json';
import { EmpAvailablityMappingModel } from 'src/app/models/employee/EmpAvailablityMappingModel';
import {employeeclientList,ClockinViewModel} from '../models/employee/employeeClient-model';
import { ClientFilter } from 'src/app/models/meeting/client-meeting';

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


export class EmployeeapiService {

  constructor(private _http : HttpClient) { }



  addEmployee(empObj: EmployeeModel){
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post<APIResponse<number>>(environment.domain + "/api/Employee/addEmployee", empObj,httpOptions);            
  }
  

  getEmployeeListObj(userId:number)
  {
    return this._http.get<APIResponse<EmployeeList[]>>(environment.domain +"/api/Employee/getEmployeeListObj/"+userId);
  } 


  getEmpListObj(model:ClientFilter) 
  {  
    return this._http.post<APIResponse<EmployeeList[]>>(environment.domain + "/api/Employee/getEmployeeListObj", model, httpOptionsObj);
  }

  
  getEmployeeInfo(empId : number)
  {
    return this._http.get<APIResponse<EmployeeJson>>(environment.domain + "/api/Employee/getEmployeebyId/" + empId);
  }  

  deleteEmployee(empId : Number)
  {
    return this._http.get<APIResponse<string>>(environment.domain + "/api/Employee/deleteemployee/" + empId);
  } 


  saveIncident(_req : Incident){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Employee/addIncident", _req,httpOptions);            
  }


  getIncidentList(empId : number)
  {
    return this._http.get<APIResponse<Incident[]>>(environment.domain + "/api/Employee/getIncidentList" + '/' + empId);
  } 

  delIncident(incidentId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'incidentId': incidentId
      }
    });
    return this._http.delete(environment.domain + "/api/Employee/delIncident", { params: reqPara });
  }


  saveAttendance(_req : Attendance){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Employee/addAttendance", _req,httpOptions);            
  }


  getAttendanceList(empId : number)
  {
    return this._http.get<APIResponse<Incident>>(environment.domain + "/api/Employee/getAttendanceList" + '/' + empId);
  } 


  delAttendance(attendanceId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'attendanceId': attendanceId
      }
    });
    return this._http.delete(environment.domain + "/api/Employee/delAttendance", { params: reqPara });
  }

  SaveEmployeeStatus(_obj : Empstatus){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Employee/addStatus", _obj,httpOptions);
  }

  getEmpStatusList(empId:number)
  {   
    return this._http.get<APIResponse<Empstatus[]>>(environment.domain + "/api/Employee/getEmpStatusList"+"/"+empId);
  }

  delEmpStatus(statusId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'statusId': statusId
      }
    });
    return this._http.delete(environment.domain + "/api/Employee/delEmpStatus", { params: reqPara });
  }

  
  getAvailabilityList()
  {
    return this._http.get<APIResponse<any[]>>(environment.domain + "/api/Employee/getAvailabilityList");
  } 
  
  saveAddress(_req : AddressObj){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Employee/addAddress", _req,httpOptions);            
  }


  geAddress(empId : number)
  {
    return this._http.get<APIResponse<AddressObj>>(environment.domain + "/api/Employee/getAddress" + '/' + empId);
  } 

  saveCompliance(_req : ComplianceObj){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Employee/addCompliance", _req,httpOptions);            
  }


  geComplianceList(empId : number)
  {

    return this._http.get<APIResponse<ComplianceObj[]>>(environment.domain + "/api/Employee/getComplianceList" + '/' + empId);
  } 



  SaveEmployeeRate(_obj : EmployeeRateModel){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Employee/addRate", _obj,httpOptions);   
              
  }

  GetEmployeeRateLst(empId:number)
  {
    return this._http.get<APIResponse<EmployeeRateModel[]>>(environment.domain + "/api/Employee/getEmpRate"+ '/' + empId);
  } 



  delEmpPayRate(rateId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'rateId': rateId
      }
    });
    return this._http.delete(environment.domain + "/api/Employee/delEmpPayRate", { params: reqPara });
  }
  

  addEmpDeclinedCase(_obj : EmpDeclinedCase){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Employee/addEmpDeclinedCase", _obj,httpOptions);   
              
  }

  getEmpDeclinedcase(empId:number)
  {
    return this._http.get<APIResponse<EmpDeclinedCase[]>>(environment.domain + "/api/Employee/getEmpDeclinedcase"+ '/' + empId);
  } 



  delDeclinedCase(declinedCaseId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'declinedCaseId': declinedCaseId
      }
    });
    return this._http.delete(environment.domain + "/api/Employee/delDeclinedCase", { params: reqPara });
  }
  







  UploadFile(formData:FormData)
  {
    var headers_object = new HttpHeaders();  
    headers_object.append('Content-Type', 'text/plain;charset=UTF-8');  
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    }; 
    return this._http.post(environment.domain + "/api/Common/UploadFile", formData,{reportProgress: true, observe: 'events'},);  
  
     
  }


  saveAvailabilityMapping(_req: EmpAvailablityMappingModel) {
    _req.availbilityId = Number(_req.availbilityId);
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Employee/addAvailabilityMapping", _req, httpOptions);
  }

  
  GetClientListByempId(empId:number){
    return this._http.get<APIResponse<employeeclientList>>(environment.domain + "/api/Employee/GetClientListByempId"+"/"+empId);
  }

  GetClockinDetailsByUserId(userId:number){
    return this._http.get<APIResponse<ClockinViewModel>>(environment.domain + "/api/Employee/GetClockinDetails"+"/"+userId);
  }  
}
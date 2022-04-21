import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http'; 
import { environment } from 'src/environments/environment.prod';
import { APIResponse } from '../models/api-response';
import { ClientModel } from 'src/app/models/client/client-model';
import { ClientStatusModel,ClientStatusLst } from 'src/app/models/client/status-model';
import { Medicationcs } from '../models/client/medicationcs-model';
import { ServiceTaskView,ServiceTaskModel }  from 'src/app/models/client/service-task-model';
import { EmployeeDecline,EmployeeDeclineView }  from 'src/app/models/client/employee-decline';
import {ClientEmrgencyInfo} from 'src/app/models/client/EmergencyInfo';
import{provisioninfo} from 'src/app/models/client/provisioninfo';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(private _http : HttpClient) { }
  
  addClient(clObj: ClientModel){ 
    debugger;
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/addClient", clObj,httpOptions);            
  }

  getClientDetail( userId : number)
  {
    return this._http.get<APIResponse<ClientModel>>(environment.domain + "/api/Client/getClientDetail" + '/' + userId);
  } 

  SaveClientStatus(_obj : ClientStatusModel){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/addStatus", _obj,httpOptions);  
              
  }

  getClientStatusList(clientId:number)
  {
    return this._http.get<APIResponse<ClientStatusLst>>(environment.domain + "/api/Client/getClientStatusList"+"/"+clientId);
  } 



  SaveMedicationcs(_obj:Medicationcs)
  {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    }; 
return this._http.post(environment.domain + "/api/Client/ClientMedicationcs", _obj,httpOptions);      
  }

  getClientMedicationcsList(clientId:number)
  {
    return this._http.get<APIResponse<Medicationcs>>(environment.domain + "/api/Client/GetClientMedicationcs"+"/"+clientId);
  } 

  deleteMedicationcsRecord(MedicationId:number,ClientId:number)
  {
    const Req_param=new HttpParams({
      fromObject:{
        'MedicationId':Number(MedicationId),
        'UserId':Number(ClientId)      
      }
    });
    return this._http.delete<APIResponse<Medicationcs>>(environment.domain + "/api/Client/deleteMedicationData",{params:Req_param});
  } 

  createServiceTask(_lstmodel : ServiceTaskModel[]){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/createServiceTask", _lstmodel,httpOptions);  
              
  }


  getServiceTaskList(userId : number)
  {
   
    return this._http.get<APIResponse<ServiceTaskView[]>>(environment.domain + "/api/Client/getServiceTaskList" + '/' + userId);
  }


  
  updateService(model : ServiceTaskModel){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/updateService", model,httpOptions);  
              
  }


  deleteService(TaskSrvId:number)
  {
    const reqPara=new HttpParams({
      fromObject:{
        'TaskSrvId':TaskSrvId
      }
    });
    return this._http.delete(environment.domain + "/api/Client/deleteService",{params:reqPara});
  } 

  


  createEmpDeclined(model : EmployeeDecline){ 
   
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/createEmpDeclined", model,httpOptions);  
              
  }


  getEmpDeclined(userId : number)
  {
    
    return this._http.get<APIResponse<EmployeeDeclineView[]>>(environment.domain + "/api/Client/getEmpDeclined" + '/' + userId);
  }


  
  updateEmpDeclined(model : EmployeeDecline){ 
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/updateEmpDeclined", model,httpOptions);  
              
  }


  deleteEmpDeclined(declinedId:number)
  {
  
    const reqPara=new HttpParams({
      fromObject:{
        'declinedId':declinedId
      }
    });
    return this._http.delete(environment.domain + "/api/Client/deleteEmpDeclined",{params:reqPara});
  } 



  SaveEmergencyInfo(_obj : ClientEmrgencyInfo){ 
    
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/ClientEmergencyInfo", _obj,httpOptions);   
              
  }

  getEmergencyInfoList(UserId:number)
  {
    return this._http.get<APIResponse<ClientEmrgencyInfo>>(environment.domain + "/api/Client/getClientEmergencyInfo"+"/"+UserId);
  } 


  getProvisionInfoList(UserId:number)
  {
    return this._http.get<APIResponse<ClientEmrgencyInfo>>(environment.domain + "/api/Client/ProvisionInfo"+"/"+UserId);
  } 




  SaveProvisionInfoList(_obj : any){ 
    
    var headers_object = new HttpHeaders();
        headers_object.append('Content-Type', 'application/json');
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
        const httpOptions = {
          headers: headers_object
        }; 
    return this._http.post(environment.domain + "/api/Client/SaveProvisionInfo", _obj,httpOptions);   
              
  }



}

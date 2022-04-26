import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { ItemsList, SelectList } from 'src/app/models/common';
import { ItemModel } from 'src/app/admin/model/item-model';
//import { FolderData  } from 'src/app/models/employee/Document';
import { TaskModel } from 'src/app/models/client/service-task-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private _http: HttpClient) { }


  getMaster(typeId: number) {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getMaster" + '/' + typeId);
  }

  getMasterType() {
    debugger;
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getMasterType");
  }
  addMasterType(_name: string) {
    debugger;
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    let params = new HttpParams();
    params = params.append('ame', _name);


    return this._http.post(environment.domain + "/api/Common/addMasterType?Name=" + _name, httpOptions);
  }


  createMaster(reqObj: ItemModel) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Common/addMaster", reqObj, httpOptions);
  }

  getSystemMaster() {
    return this._http.get<APIResponse<ItemModel[]>>(environment.domain + "/api/Common/getSystemMaster");
  }

  getEmpTypeList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getEmpTypeList");
  }


  getCountryList() {
    return this._http.get<APIResponse<SelectList[]>>(environment.domain + "/api/Common/getCountry");
  }

  getStateList(country: string) {
    return this._http.get<APIResponse<SelectList[]>>(environment.domain + "/api/Common/getStateList" + '/' + country);
  }

  getEmployees(type: string) {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getEmployees" + '/' + type);
  }

  getEmpList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getEmpList");
  }

  getClientList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getClientList");
  }


  createTask(reqObj: TaskModel) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Common/createTask", reqObj, httpOptions);
  }
  getTaskList() {
    return this._http.get<APIResponse<TaskModel[]>>(environment.domain + "/api/Common/getTaskList");
  }
  getNoteTypeList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getNoteTypeSelectList");
  }
  getCategoryList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getCategory");
  }
  getSubCategoryList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getSubCategory");
  }
}

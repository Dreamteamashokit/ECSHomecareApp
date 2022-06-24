import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { ItemsList, SelectList } from 'src/app/models/common';
import { ItemModel } from 'src/app/admin/model/item-model';
//import { FolderData  } from 'src/app/models/employee/Document';
import { TaskModel } from 'src/app/models/client/service-task-model';
import { ClientGeoProvisions } from 'src/app/models/availbility/availbility-response';
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

  getEmployees(type: number) {
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

  getDiagnosisList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getDiagnosisList");
  }

  getNoteTypeList() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getNoteTypeSelectList");
  }

  getProvisionList(type: number) {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getProvisionList" + '/' + type);
  }

  getPayers() {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getPayers");
  }

  getUsers(type: number) {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getUsers" + '/' + type);
  }

  getUsersGeoProvision(userId: number) {
    return this._http.get<APIResponse<ClientGeoProvisions>>(environment.domain + "/api/Common/getUsersGeoProvision" + '/' + userId);
  }

  getCMPLCategoryList(categoryId: number,userTypeId: number) {
    return this._http.get<APIResponse<ItemsList[]>>(environment.domain + "/api/Common/getCMPLCategoryList" + '/' + categoryId+ '/' + userTypeId);
  }

}

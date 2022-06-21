import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResponse } from '../models/api-response';
import { DiagnosisItem } from 'src/app/models/master/diagnosis-item';
import { TaskModel } from 'src/app/models/client/service-task-model';
import { CategoryModel } from '../models/common/category';
const httpOptionsObj = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private _http: HttpClient) {

  }


  createDiagnosis(reqObj: DiagnosisItem) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Master/createDiagnosis", reqObj, httpOptions);
  }


  getDiagnosisList() {
    return this._http.get<APIResponse<DiagnosisItem[]>>(environment.domain + "/api/Master/getDiagnosis");
  }


  updateTask(reqObj: TaskModel) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Master/updateTask", reqObj, httpOptions);
  }


  delTask(TaskId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'TaskId': TaskId
      }
    });
    return this._http.delete(environment.domain + "/api/Master/activeTask", { params: reqPara });
  }

  addCMPLCategory(_req: CategoryModel) {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + "qatest");
    const httpOptions = {
      headers: headers_object
    };
    return this._http.post(environment.domain + "/api/Master/addCMPLCategory", _req, httpOptions);
  }

  getCMPLCategoryAllList(userTypeId: number) {
    return this._http.get<APIResponse<CategoryModel[]>>(environment.domain + "/api/Master/getCMPLUserCategoryList" + "/" + userTypeId);
  }

  getCMPLCategoryList(categoryId: number) {
    return this._http.get<APIResponse<CategoryModel[]>>(environment.domain + "/api/Master/getCMPLCategoryList" + "/" + categoryId);
  }

  delCMPLCategory(categoryId: number) {
    const reqPara = new HttpParams({
      fromObject: {
        'categoryId': categoryId
      }
    });
    return this._http.delete(environment.domain + "/api/Master/delCMPLCategory", { params: reqPara });
  }







}

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientContactLog } from 'src/app/models/client/client-contactlog-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList } from 'src/app/models/common';
import {  UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { DiagnosisModel } from 'src/app/models/client/diagnosis-model';
import { DiagnosisView } from 'src/app/models/client/diagnosis-view';


@Component({
    selector: 'app-diagnosis',
    templateUrl: './diagnosis.component.html',
    styleUrls: [
      '../../../assets/css/orange-blue.css',      
      './diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  currentUser: UserModel;
  modalRef?: BsModalRef;
  model = new DiagnosisModel();
  modelList:DiagnosisView[]=[];
  diagnosisList:ItemsList[]=[];  
 
  @ViewChild("templatelog") templatelog: TemplateRef<any>;

  constructor(
    private comApi: CommonService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private clientapi: ClientApiService
  ) {
    this.model.isActive = 1;
    this.model.entityId = 0;
    this.currentUser = this.accountApi.getCurrentUser();  
    
    
    this.comApi.getDiagnosisList().subscribe(Responce => {
      this.diagnosisList = Responce.data;
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {  
        this.model.userId = Number(params["clientId"]);     
        this.getDiagnosisList();
      }
    );
  }

  saveModel() {
    debugger;
    this.model.isActive=1;
    this.model.dxId = Number(this.model.dxId);
    this.model.orderNo = Number(this.model.orderNo); 
    this.model.isActive = Number(this.model.isActive);
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.model.userId);    
    if(this.model.entityId==0)
    {
      this.clientapi.addDiagnosis(this.model).subscribe(Responce => {
        this.getDiagnosisList();
        this.decline();
      });
    }
    else
    {
      
      this.clientapi.updateDiagnosis(this.model).subscribe(Responce => {
    
        this.getDiagnosisList();
        this.decline();
      });
    }
  
  }

  updateModel(item:DiagnosisView) 
  {
    this.model.entityId = item.diagnosisId;
    this.model.dxId = item.dxId;
    this.model.orderNo = item.orderNo; 
    this.model.isPrimary = item.isPrimary;
    this.openModal(this.templatelog);

  }

  getDiagnosisList() {
    this.clientapi.getDiagnosisModel(this.model.userId).subscribe(Responce => {
      this.modelList = Responce.data;
    });
  }

  delModel(diagnosisId:number) {    

    let isOk = confirm("Are you sure to delete?");
  if(isOk)
  {
    this.clientapi.deleteDiagnosis(diagnosisId).subscribe((response) => {
      this.getDiagnosisList();
      this.decline();
    });
  }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {


    this.model.entityId = 0;
    this.model.dxId = 0;
    this.model.orderNo = 0; 
    this.model.isPrimary = false;
    this.modalRef?.hide();
  }
}

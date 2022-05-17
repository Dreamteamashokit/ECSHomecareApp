import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';

import { Router,ActivatedRoute, Params } from '@angular/router';
import {ClientStatusModel} from 'src/app/models/client/status-model';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType} from 'src/app/models/common';

@Component({
  selector: 'app-client-status',
  templateUrl: './client-status.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './client-status.component.scss']
})
export class ClientStatusComponent implements OnInit {
  EmplList = Array<ItemsList>(); 
  ActivityLst: ItemsList[] = [];
  ReferralCodeLst: ItemsList[] = [];
  OfficeUser: ItemsList[] = [];
  
 
  modalRef?: BsModalRef;
   model = new ClientStatusModel(0,'',0,'',0,0,0,0,false,false,false);
   ClientStatusObjList:any;
   ClientId:number;
  constructor(private comApi: CommonService,
    private route:ActivatedRoute,
    private modalService: BsModalService, private empApi: EmployeeapiService, private clientapi : ClientApiService) {
      setTheme('bs3');
      // this.maxDate.setDate(this.maxDate.getDate() + 7);
      // this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
     
      this.GetEmpLst();
      this.comApi.getMaster(MasterType.ClientStatusActivity).subscribe((response) => {
        
        this.ActivityLst = response.data;
      });
  
      this.comApi.getMaster(MasterType.ClientStatusReferralCode).subscribe((response) => {
       
        this.ReferralCodeLst = response.data;
      });
      //this.GetOfficeUserLst();
      
     }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{   
        this.ClientId = Number(params["clientId"]); 
        this.GetClientStatusLst();
      });
  }
  openModal(template: TemplateRef<any>) {
    
   this.modalRef = this.modalService.show(template);
 }
 
 decline(): void {
  
   this.modalRef?.hide();
 }

 onClickSubmit() {     
  this.model.activityId=Number(this.model.activityId);
  this.model.date=this.model.date;
  this.model.note=this.model.note;
  this.model.officeUserId=Number(this.model.officeUserId);
  this.model.text=Boolean(this.model.text);
  this.model.screen=Boolean(this.model.screen);
  this.model.email=Boolean(this.model.email);
  this.model.officeUserReferralID=Number(this.model.officeUserReferralID);
  this.model.referralCode=Number(this.model.referralCode);  
  this.model.clientId=Number(this.ClientId);  
  this.clientapi.SaveClientStatus(this.model).subscribe((response) => {
    // this.modalRef?.hide();
    this.decline();   
this.GetClientStatusLst();
    
   
  }); 
}



GetOfficeUserLst() {
 
 this.comApi.getEmployees(1).subscribe((response) => {
  this.OfficeUser = response.data;
});
}


GetEmpLst() {
 
  this.comApi.getEmpList().subscribe((response) => {
   
    this.EmplList = response.data;      
  });
 }


 GetClientStatusLst(){
this.clientapi.getClientStatusList(this.ClientId).subscribe((response)=>{
  this.ClientStatusObjList=response.data
})

 }



}

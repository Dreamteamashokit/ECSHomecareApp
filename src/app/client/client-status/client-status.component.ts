import { Component, OnInit,TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {ClientStatusModel,ClientStatusLst} from 'src/app/models/client/Status-model';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType} from 'src/app/models/common';
import { UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { UserType } from 'src/app/models/common';
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
  OfficeUserList: ItemsList[] = [];
  currentUser:UserModel;
  modalRef?: BsModalRef;
   model = new ClientStatusModel(0,'',0,'',0,0,0,0,false,false,false);
   ClientStatusObjList:ClientStatusLst[]=[];
   ClientId:number;
   _effectiveDate = new Date();



  constructor(private comApi: CommonService,
    private accountApi: AccountService,
    private route:ActivatedRoute,
    private modalService: BsModalService, 
    private empApi: EmployeeapiService, 
    private datepipe: DatePipe,
    private clientapi : ClientApiService) {
      setTheme('bs3');   
      
      this.currentUser=this.accountApi.getCurrentUser();
      this.comApi.getEmpList().subscribe((response) => {
        this.EmplList = response.data;      
      });
      this.comApi.getMaster(MasterType.ClientStatusActivity).subscribe((response) => {
        
        this.ActivityLst = response.data;
        this.model.activityId= this.ActivityLst[0].itemId;
      });
  
      this.comApi.getMaster(MasterType.ClientStatusReferralCode).subscribe((response) => {
       
        this.ReferralCodeLst = response.data;
      });

      this.comApi.getUsers(UserType.Coordinators).subscribe((response) => {
        this.OfficeUserList = response.data;
      });
      this.model.officeUserId=-1;
      this.model.officeUserReferralID=-1;


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
  this.model.date=this.datepipe.transform(this._effectiveDate, 'dd-MM-yyyy')||"";
  this.model.note=this.model.note;
  this.model.officeUserId=Number(this.model.officeUserId);
  this.model.text=Boolean(this.model.text);
  this.model.screen=Boolean(this.model.screen);
  this.model.email=Boolean(this.model.email);
  this.model.officeUserReferralID=Number(this.model.officeUserReferralID);
  this.model.referralCode=Number(this.model.referralCode);  
  this.model.clientId=Number(this.ClientId);  
  this.model.createdBy=this.currentUser.userId;
  this.clientapi.SaveClientStatus(this.model).subscribe((response) => {

    this.decline();   
this.GetClientStatusLst();
    
   
  }); 
}

 GetClientStatusLst(){
this.clientapi.getClientStatusList(this.ClientId).subscribe((response)=>{
  this.ClientStatusObjList=response.data
})

 }

 editObj:ClientStatusLst;
 preIndex:number=-1;
 editStatus(item:ClientStatusLst,index:number) {
  if(this.preIndex!==-1)
  {
    this.cancelStatus(this.preIndex);
  }
  this.preIndex=index;
  this.editObj=new ClientStatusLst(item.activityText,item.statusDate,item.referralCodeText,item.note);
  this.editObj.statusId=item.statusId;
  this.editObj.isEdit=item.isEdit;
  item.isEdit=true;
  this.editObj.userId=item.userId;
  
  item.effectiveDate=new Date(item.statusDate);
  item.activityId=this.ActivityLst.filter(x=>x.itemName===item.activityText)[0].itemId;
  item.referralCode=this.ReferralCodeLst.filter(x=>x.itemName===item.referralCodeText)[0].itemId;

}

cancelStatus(index:number) { 
  this.ClientStatusObjList[index].statusDate=this.editObj.statusDate;
  this.ClientStatusObjList[index].note=this.editObj.referralCodeText;
  this.ClientStatusObjList[index].activityText=this.editObj.activityText;
  this.ClientStatusObjList[index].note=this.editObj.note;
  this.ClientStatusObjList[index].isEdit=false;
}

updateStatus(item:ClientStatusLst) {
  let reqObj= new ClientStatusModel(0,'',0,'',0,0,0,0,false,false,false);
  reqObj.statusId=Number(item.statusId);
  reqObj.activityId=Number(item.activityId);
  reqObj.referralCode=Number(item.referralCode);
  reqObj.note=item.note;
  reqObj.userId=Number(this.ClientId);

  reqObj.statusDate=this.datepipe.transform(item.effectiveDate, 'dd-MM-yyyy')||"";
  this.clientapi.updateClientStatus(reqObj).subscribe(response => {
    this.GetClientStatusLst();
    item.isEdit=false;
  });

}

delStatus(statusId: number) {
  let isOk = confirm("Are you sure to delete?");
  if(isOk)
  {
  this.clientapi.delClientStatus(statusId).subscribe(response => {
    this.GetClientStatusLst();
  });
}
}

dateParse(_date: string) {
  return new Date(_date);
}












}

import { Component, OnInit,TemplateRef ,ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';

import { Router,ActivatedRoute, Params } from '@angular/router';
import{Empstatus} from 'src/app/models/employee/empstatus';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType} from 'src/app/models/common';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import { Usertype } from 'src/app/commanHelper/usertype';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-emp-status',
  templateUrl: './emp-status.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css','./emp-status.component.scss']
})

export class EmpStatusComponent implements OnInit {
  empList = Array<ItemsList>();
  OfficeUser:ItemsList[] = [];
  EmplList = Array<ItemsList>(); 
  TypeStatusList: ItemsList[] = [];
  _effectiveDate:Date;
  _returnDate:Date;
  currentUser:UserModel;
  
  ScheduleLst :any;
  modalRef?: BsModalRef;
  @ViewChild("template") templatelog: TemplateRef<any>;
   model = new Empstatus('',false,false,'','','',0,0,0,0,false,false,false);
   EmpStatusObjList: any;

  constructor(
    private comApi: CommonService,
    private route:ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private empApi: EmployeeapiService, 
    private clientapi : ClientApiService,
    private datepipe: DatePipe,
    ) {
    setTheme('bs3');
    this.currentUser=this.accountApi.getCurrentUser();
    this.comApi.getEmpList().subscribe((response) => {
      if(response.result)
      {      
        this.EmplList = response.data;
      }});
    this.comApi.getMaster(MasterType.EmpStatusType).subscribe((response) => {
      if(response.result)
      {      
        this.TypeStatusList = response.data;
      }});
    this.comApi.getUsers(Usertype.Coordinators).subscribe((response) => {  
      if(response.result)
      {      
        this.OfficeUser = response.data;
      }});

   }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{   
     this.model.employeeId = Number(params["empId"]);   
     debugger;
         this.getEmployeeStatusLst(this.model.employeeId);
      });
   
  }

  openModal(template: TemplateRef<any>) {
     this.GetSchedulingLst();
    this.modalRef = this.modalService.show(template);
  }
  
  decline(): void {
   
    this.modalRef?.hide();
  }

  onClickSubmit() { 
    

    this.model.effectiveDate=this.datepipe.transform(this._effectiveDate, 'dd-MM-yyyy')||"";
    this.model.returnDate=this.datepipe.transform(this._returnDate, 'dd-MM-yyyy')||"";

    this.model.userId=Number(this.model.employeeId);    
    this.model.createdBy=this.currentUser.userId;
    this.model.officeUserId=Number(this.model.officeUserId);
    this.model.scheduling=Number(this.model.scheduling);
    this.model.employeeId=Number(this.model.employeeId);
    this.model.typeStatusId=Number(this.model.typeStatusId);
    this.model.text=Boolean(this.model.text);
    this.model.screen=Boolean(this.model.screen);
    this.model.email=Boolean(this.model.email);
    this.model.rehire=Boolean(this.model.rehire);
    this.model.resume=Boolean(this.model.resume);    
    this.empApi.SaveEmployeeStatus(this.model).subscribe((response) => {
      this.decline();   
      this.getEmployeeStatusLst(this.model.employeeId);     
     
    }); 
 }

 getEmployeeStatusLst(userId:number) {
   debugger;
  this.empApi.getEmpStatusList(userId).subscribe((response) => {
    if(response.result)
    {      
      this.EmpStatusObjList = response.data; 
    }});
}


GetSchedulingLst() { 
  this.comApi.getEmpList().subscribe((response) => {
    this.empList = response.data;
  });
}

editItem(_item:Empstatus)
{
  this.model.userId=Number(_item.employeeId);    
  this.model.createdBy=this.currentUser.userId;
  this.model.officeUserId=Number(_item.officeUserId);
  this.model.scheduling=Number(_item.scheduling);
  this.model.employeeId=Number(_item.employeeId);
  this.model.typeStatusId=Number(_item.typeStatusId);
  this.model.text=Boolean(_item.text);
  this.model.screen=Boolean(_item.screen);
  this.model.email=Boolean(_item.email);
  this.model.rehire=Boolean(_item.rehire);
  this.model.resume=Boolean(_item.resume);  

 this._effectiveDate=new Date(_item.effectiveDate);
 this._returnDate=new Date(_item.returnDate);

  this.openModal(this.templatelog);
}
delItem(_itemId:number)
{
  let isOk = confirm("Are you sure to delete?");
  if(isOk)
  {
  }
}

  

}

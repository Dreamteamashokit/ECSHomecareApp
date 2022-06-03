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
    private empApi: EmployeeapiService, private clientapi : ClientApiService) {
    setTheme('bs3');

    this.currentUser=this.accountApi.getCurrentUser();
   
    this.comApi.getEmpList().subscribe((response) => {
      if(response.result)
      {
      
        this.EmplList = response.data;
      }
    });

    this.comApi.getMaster(MasterType.EmpStatusType).subscribe((response) => {
      this.TypeStatusList = response.data;
    });




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
     this.GetOfficeUserLst();

  
     this.GetSchedulingLst();
    this.modalRef = this.modalService.show(template);
  }
  
  decline(): void {
   
    this.modalRef?.hide();
  }

  onClickSubmit() {     

    
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
      // this.modalRef?.hide();
      this.decline();   
      this.getEmployeeStatusLst(this.model.employeeId);
      
     
    }); 
 }

 getEmployeeStatusLst(empid:number) {
   debugger;
  this.empApi.getEmpStatusList(empid).subscribe((response) => {
    this.EmpStatusObjList = response.data;      
  });
}

GetOfficeUserLst() {

  this.comApi.getEmployees(1).subscribe((response) => {
    this.OfficeUser = response.data;
  });


}

GetSchedulingLst() {
 
  this.comApi.getEmpList().subscribe((response) => {
    this.empList = response.data;
  });
}

editItem(_item:Empstatus)
{
  this.model=_item;
  this.openModal(this.templatelog);
}
delItem(_ItemId:number)
{
  
}

  

}

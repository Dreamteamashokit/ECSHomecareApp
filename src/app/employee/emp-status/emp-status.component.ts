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
  empList : ItemsList[] = [];
  officeUserList:ItemsList[] = [];
  TypeStatusList: ItemsList[] = [];
  currentUser:UserModel;
  scheduleList :any;
  modalRef?: BsModalRef;
  @ViewChild("template") templatelog: TemplateRef<any>;
   model = new Empstatus('',false,false,'','','',0,0,0,0,false,false,false);
   empStatusList: Empstatus[]=[];

  constructor(
    private comApi: CommonService,
    private route:ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private empApi: EmployeeapiService, 
    private clientapi : ClientApiService,
    private datepipe: DatePipe,
    ) {

      this.model.effectiveDateTime=new Date();
      this.model.returnDateTime=new Date();
    setTheme('bs3');
    this.currentUser=this.accountApi.getCurrentUser();  
    this.comApi.getMaster(MasterType.EmpStatusType).subscribe((response) => {
      if(response.result)
      {      
        this.TypeStatusList = response.data;
      }});
    this.comApi.getUsers(Usertype.Coordinators).subscribe((response) => {  
      if(response.result)
      {      
        this.officeUserList = response.data;
      }});

      this.comApi.getEmpList().subscribe((response) => {
        this.empList = response.data;
      });

   

   }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{   
        this.model.userId = Number(params["empId"]);   
         this.getEmployeeStatusLst(this.model.userId);
      });
   
  }

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template);
  }
  
  decline(): void {
    this.model.entityId=0;  
    this.modalRef?.hide();
  }

  onClickSubmit() { 
    
    this.model.userId=Number(this.model.userId);
    this.model.officeUserId=Number(this.model.officeUserId);
    this.model.scheduling=Number(this.model.scheduling);
    this.model.employeeId=Number(this.model.employeeId);
    this.model.typeStatusId=Number(this.model.typeStatusId);
    this.model.text=Boolean(this.model.text);
    this.model.screen=Boolean(this.model.screen);
    this.model.email=Boolean(this.model.email);
    this.model.rehire=Boolean(this.model.rehire);
    this.model.resume=Boolean(this.model.resume);  
    
    this.model.createdBy=this.currentUser.userId;
    this.model.effectiveDate=this.datepipe.transform(this.model.effectiveDateTime, 'dd-MM-yyyy')||"";
    this.model.returnDate=this.datepipe.transform(this.model.returnDateTime, 'dd-MM-yyyy')||""; 

    this.empApi.SaveEmployeeStatus(this.model).subscribe((response) => {
      this.decline();   
      this.getEmployeeStatusLst(this.model.userId);     
     
    }); 
 }

 getEmployeeStatusLst(userId:number) {
  this.empApi.getEmpStatusList(userId).subscribe((response) => {
    if(response.result)
    {      
      this.empStatusList = response.data; 

      console.log(response.data);
    }});
}



editItem(_item:Empstatus)
{


  this.model.note=_item.note;
  this.model.rehire=_item.rehire;
  this.model.resume=_item.resume;  
  this.model.entityId=_item.entityId;  

  this.model.typeStatusId=Number(_item.typeStatusId);

  this.model.employeeId=Number(_item.userId);

  this.model.userId=Number(_item.employeeId);    
  this.model.createdBy=this.currentUser.userId;
  this.model.officeUserId=Number(_item.officeUserId);
  this.model.scheduling=Number(_item.scheduling);


  this.model.text=Boolean(_item.text);
  this.model.screen=Boolean(_item.screen);
  this.model.email=Boolean(_item.email);

  this.model.effectiveDateTime=new Date(_item.effectiveDateTime);
  this.model.returnDateTime=new Date(_item.returnDateTime);
  this.openModal(this.templatelog);
}

delItem(statusId:number)
{
  let isOk = confirm("Are you sure to delete?");
  if(isOk)
  {
    this.empApi.delEmpStatus(statusId).subscribe((response) => {
      this.getEmployeeStatusLst(this.model.userId);   

  });
}

}



}

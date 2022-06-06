import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ItemsList,MasterType } from 'src/app/models/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import{ EmpDeclinedCase } from 'src/app/models/employee/save-emp-declined-case';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
@Component({
  selector: 'app-emp-declined-cases',
  templateUrl: './emp-declined-cases.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',    
    './emp-declined-cases.component.scss']
})
export class EmpDeclinedCasesComponent implements OnInit {

  IsLoad:boolean=false;
  modalRef?: BsModalRef;
  clientList :ItemsList[] = [];
 currentUser:UserModel;
 _time:Date;
 _reportedDate = new Date();
 _startDate = new Date();
 caseTyeData: ItemsList[] = [];
 model=new EmpDeclinedCase();
 empCaseList:EmpDeclinedCase[]=[];  
 @ViewChild("template") templatelog: TemplateRef<any>;


  constructor(
    private comApi: CommonService,
    private datepipe: DatePipe,
    private route:ActivatedRoute,
    private accountApi: AccountService,
    private modalService: BsModalService, private empApi: EmployeeapiService, private clientapi : ClientApiService) { 
      this._time=new Date();
      this.model.caseTypeId=-1;
      this.model.day=1;
      this.model.week=1; 
      this.currentUser=this.accountApi.getCurrentUser();
      this.comApi.getClientList().subscribe((response) => {
        if(response.result)
        {
          this.clientList = response.data;
        }});
      this.comApi.getMaster(MasterType.CaseType).subscribe((response) => {
        this.caseTyeData = response.data;
      });
    }

  ngOnInit(): void {
    debugger
    this.route.params.subscribe(
      (params : Params) =>{
        this.model.userId= Number(params["empId"]);
         this.getCaseList(this.model.userId);
      }
    );
   
  }

  openModal(template: TemplateRef<any>) {    
   
   this.modalRef = this.modalService.show(template);
 }

 decline(): void {   
  this.modalRef?.hide();
}

onClickSubmit() { 

  debugger;
  this.IsLoad=true;
  this.model.reportedDate= (this.datepipe.transform(this._reportedDate, 'dd-MM-yyyy')||"") +', '+  (this.datepipe.transform(this._time, 'hh:mm:ss a')||"" );
  this.model.assignmentStart=this.datepipe.transform(this._startDate, 'dd-MM-yyyy')||"";
  this.model.userId=Number(this.model.userId);
  this.model.caseTypeId=Number(this.model.caseTypeId);
   this.model.clientId=Number(this.model.clientId);
   this.model.day=Number(this.model.day);
   this.model.week=Number(this.model.week); 
   this.model.declineReason=this.model.declineReason;  
   this.model.note=this.model.note; 
   this.model.userId=Number(this.model.userId); 
   this.model.createdBy=this.currentUser.userId; 
   this.empApi.addEmpDeclinedCase(this.model).subscribe((response) => {
    this.IsLoad=false;
     this.getCaseList( this.model.userId);  
     this.decline();
    }); 
  }




getCaseList(empId : number) {
this.empApi.getEmpDeclinedcase(empId).subscribe((response) => {
  if(response.result)
  {
    this.empCaseList = response.data;
    console.log(response.data);
  }});
}

editItem(_item:EmpDeclinedCase)
{
 this.model.entityId=_item.declinedCaseId;
  this.model.clientId=_item.clientId;
  this.model.caseTypeId=_item.caseTypeId;
  this.model.declineReason=_item.declineReason;
  this.model.note=_item.note;
  this.model.day=_item.day;
  this.model.week=_item.week;


  this._startDate=new Date(_item.assignmentStartDateTime);
  this._reportedDate=new Date(_item.reportedDateTime);
  this._time=new Date(_item.reportedDateTime);
  this.openModal(this.templatelog);
}

delItem(declinedCaseId:number)
{
  let isOk = confirm("Are you sure to delete?");
if(isOk)
{
  this.empApi.delDeclinedCase(declinedCaseId).subscribe((response) => {
    this.getCaseList(this.model.userId);
  });
}
}

formateDate(item:string)
{
return new Date(item);
}













}


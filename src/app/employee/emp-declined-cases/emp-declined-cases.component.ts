import { Component, OnInit,TemplateRef } from '@angular/core';
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
  modalRef?: BsModalRef;
  ClientList = Array<ItemsList>(); 
  EmpCaseObj:any;  
  CaseTypeobj:any;
 ClientId:number;
    
 currentUser:UserModel;
 caseTyeData: ItemsList[] = [];
 model=new EmpDeclinedCase();


 _time:Date;
 _reportedDate = new Date();
 _startDate = new Date();

  constructor(
    private comApi: CommonService,
    private route:ActivatedRoute,
    private accountApi: AccountService,
    private modalService: BsModalService, private empApi: EmployeeapiService, private clientapi : ClientApiService) { 

 
      this.currentUser=this.accountApi.getCurrentUser();
   

      this.comApi.getClientList().subscribe((response) => {
        if(response.result)
        {
          debugger;
          this.ClientList = response.data;
        }
      });


      this.comApi.getMaster(MasterType.CaseType).subscribe((response) => {
        this.caseTyeData = response.data;
      });
      this.model.caseTypeId=-1;
      this.model.day=1;
      this.model.week=1;

    }

  ngOnInit(): void {
    debugger
    this.route.params.subscribe(
      (params : Params) =>{
        this.model.userId= Number(params["empId"]);

         this.GetCaseList(this.model.userId);

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

  this.model.userId=Number(this.model.userId);

  this.model.createdBy=this.currentUser.userId;
 
   this.model.assignmentStart=this.model.assignmentStart;
   this.model.caseTypeId=Number(this.model.caseTypeId);
   this.model.clientId=Number(this.model.clientId);
   this.model.day=Number(this.model.day);
   this.model.week=Number(this.model.week);
   this.model.repotedDate=this.model.repotedDate;
   this.model.declineReason=this.model.declineReason;  
   this.model.note=this.model.note; 
   this.model.userId=Number(this.model.userId); 

   this.empApi.addEmpDeclinedCase(this.model).subscribe((response) => {

    this.GetCaseList( this.model.userId);  
  this.decline();

 }); 
 }




GetCaseList(empId : number) {
  
this.empApi.getEmpDeclinedcase(empId).subscribe((response) => {
    this.EmpCaseObj = response.data;

    console.log(response);
  });
}

}


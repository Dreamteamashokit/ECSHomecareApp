import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ItemsList,MasterType } from 'src/app/models/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { EmployeeDecline,EmployeeDeclineView }  from 'src/app/models/client/employee-decline';
import { LoginModel,UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-declined-emp',
  templateUrl: './declined-emp.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',  
    './declined-emp.component.scss']
})
export class DeclinedEmpComponent implements OnInit {

  modalRef?: BsModalRef;
  empList = Array<ItemsList>(); 
  declinedList:EmployeeDeclineView[]=[];  
  currentUser:UserModel;
  _time:Date;
  _reportedDate = new Date();
  _startDate = new Date();
  

  model=new EmployeeDecline();
  caseTyeData: ItemsList[] = [];
  constructor(
    private route:ActivatedRoute,
    private datepipe: DatePipe,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private comApi: CommonService,
    private clientApi : ClientApiService
    ) { 

      this.currentUser=this.accountApi.getCurrentUser();
      this.comApi.getEmpList().subscribe((response) => {
        if(response.result)
        {
        
          this.empList = response.data;
        }
      });

      this.comApi.getMaster(MasterType.CaseType).subscribe((response) => {
        this.caseTyeData = response.data;
      });
      this.model.caseType=-1;
      this.model.empId=-1;
      this._time=new Date();
  
    }

  ngOnInit(): void {
  
    this.route.params.subscribe(
      (params : Params) =>{
         this.model.userId = Number(params["clientId"]);

         this.GetDeclinedList(this.model.userId);

      }
    );
   
  }

  openModal(template: TemplateRef<any>) {
   this.modalRef = this.modalService.show(template);
 }





 closeModel(): void {
  this.modalRef?.hide();
  this._reportedDate=new Date();
  this._startDate=new Date();
  this.model.caseType=-1;
  this.model.empId=-1;
}

 

saveDeclined() { 
 
  this.model.reportedDate= (this.datepipe.transform(this._reportedDate, 'dd-MM-yyyy')||"") +', '+  (this.datepipe.transform(this._time, 'hh:mm:ss a')||"" );

   this.model.caseType=Number(this.model.caseType);
   this.model.userId=Number(this.model.userId);
   this.model.createdBy=this.currentUser.userId;
   this.model.startDate=this.datepipe.transform(this._startDate, 'dd-MM-yyyy')||"";
   this.model.empId=Number(this.model.empId);
   this.clientApi.createEmpDeclined(this.model).subscribe((response) => {
    this.GetDeclinedList(this.model.userId);  
    this.closeModel();
 }); 
 


}




GetDeclinedList(userId : number) {
this.clientApi.getEmpDeclined(userId).subscribe((response) => {
    this.declinedList = response.data;
    console.log(response);
  });
}



delDeclined(declinedId:number) { 

  let isOk = confirm("Are you sure to delete?");
  if(isOk)
  {

  this.clientApi.deleteEmpDeclined(declinedId).subscribe((response) => {
   this.GetDeclinedList(this.model.userId);  
   this.closeModel();
}); 
  }

}










}

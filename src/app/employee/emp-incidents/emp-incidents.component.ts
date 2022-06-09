import { Component, OnInit,TemplateRef,ViewChild  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { Incident } from '../../models/employee/incident';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ItemsList } from 'src/app/models/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
@Component({
  selector: 'app-emp-incidents',
  templateUrl: './emp-incidents.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-incidents.component.scss',
  ]
})
export class EmpIncidentsComponent implements OnInit {

  @ViewChild("template") templatelog: TemplateRef<any>;
  IsLoad:boolean=false;
  modalRef?: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "my-modal"
  };
  currentUser:UserModel;

  model = new Incident(0, 0, 0,  '', '');
  clientList = Array<ItemsList>();
  incidentList: Incident[]=[];

  constructor(
    private comApi: CommonService,
    private route:ActivatedRoute,
    private datepipe: DatePipe,
    private accountApi: AccountService,
    private modalService: BsModalService, 
    private empApi: EmployeeapiService, 
    private clientapi : ClientApiService) {
    setTheme('bs3');
    this.currentUser=this.accountApi.getCurrentUser();
    this.comApi.getClientList().subscribe((response) => {
      if(response.result)
      {  
        this.clientList = response.data;
      }
    });
   }

  ngOnInit(): void {     

    this.route.params.subscribe(
      (params : Params) =>{
         this.model.userId = Number(params["empId"]);
         this.getIncidentList(this.model.userId);
      }
    );  
    
    this.model.incidentDateTime=new Date();
   
  }

  openModal(template: TemplateRef<any>) {

    

    this.modalRef = this.modalService.show(template);
  }
  
  decline(): void {   
    this.modalRef?.hide();
    this.model.entityId=0;
    this.model.clientId=0;
    this.model.incidentDetail='';
    this.model.incidentDateTime=new Date();
  }

  saveIncident() {

    this.IsLoad=true;
    this.model.clientId=Number(this.model.clientId);
    this.model.userId=Number(this.model.userId); 
    this.model.createdBy=this.currentUser.userId; 
    this.model.incidentDate=this.datepipe.transform(this.model.incidentDateTime, 'dd-MM-yyyy')||"";
    const reqObj: Incident = this.model;
    console.log('Search', reqObj);
    this.empApi.saveIncident(reqObj).subscribe((response) => {
      this.decline();
      this.getIncidentList(this.model.userId);
    });
  }



  getIncidentList(empId : number) {
    this.empApi.getIncidentList(empId).subscribe((response) => {
      if(response.result)
      {
        this.incidentList = response.data;
        console.log(response.data);
      }});
  }


 
editItem(_item:Incident)
{
 this.model.incidentId=_item.incidentId;
 this.model.entityId=_item.incidentId;
  this.model.clientId=_item.clientId;
  this.model.incidentDetail=_item.incidentDetail;
  this.model.incidentDateTime=new Date(_item.incidentDateTime);
  this.openModal(this.templatelog);
}

delItem(incidentId:number)
{
  let isOk = confirm("Are you sure to delete?");
if(isOk)
{
  this.empApi.delIncident(incidentId).subscribe((response) => {
    this.getIncidentList(this.model.userId);
  });
}
}

  

  


}

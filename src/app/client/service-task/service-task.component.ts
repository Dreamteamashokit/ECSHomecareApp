import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';

import { Router,ActivatedRoute, Params } from '@angular/router';
import { ClientStatusModel } from 'src/app/models/client/Status-model';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { ItemsList,MasterType} from 'src/app/models/common';
import { UserModel } from 'src/app/models/account/login-model';
import {TaskModel,ServiceTaskView,ServicetaskObj,ServiceTaskModel}  from 'src/app/models/client/service-task-model';
@Component({
  selector: 'app-service-task',
  templateUrl: './service-task.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './service-task.component.scss']
})
export class ServiceTaskComponent implements OnInit {

  @ViewChild("template") templatelog: TemplateRef<any>;
  clientId:number;
  currentUser:UserModel;
  taskLst:ServicetaskObj[]=[];
  srvLst:ServiceTaskModel[]=[];

  srvTaskLst:ServiceTaskView[]=[];
  modalRef?: BsModalRef;
  constructor(private comApi: CommonService,
    private accountApi: AccountService,
    private routers:Router,
    private route:ActivatedRoute,
    private modalService: BsModalService, private empApi: EmployeeapiService, private clientApi : ClientApiService) {
      setTheme('bs3');

      this.comApi.getTaskList().subscribe((response) => {
        if(response.result)
        {response.data.forEach((x: TaskModel) => {
            this.taskLst.push(new ServicetaskObj(x.taskId,x.taskCode,x.taskName));
          });
        }
      });
  
      
     }

     ngOnInit(): void {
      this.route.params.subscribe(
        (params : Params) =>{   
          this.clientId = Number(params["clientId"]); 
          this.currentUser=this.accountApi.getCurrentUser(); 
          
          this.bindServiceLst(this.clientId);

      
        });
    }
    openModal(template: TemplateRef<any>) {
      
     this.modalRef = this.modalService.show(template);
   }
   
   closeModal(): void {
    
     this.modalRef?.hide();
   }
   bindServiceLst(clientId:number) { 


    this.clientApi.getServiceTaskList(clientId).subscribe((response) => {
      if(response.result)
      {
      
        this.srvTaskLst = response.data;
      }
    });
   }


   addService() { 
    


      let remaining = this.taskLst.filter(
        (res: ServicetaskObj) => res.isChecked == true
      );
      remaining.forEach((x: ServicetaskObj) => {
        let obj=new ServiceTaskModel(x.taskId,x.frequency,x.serviceNote);
        obj.userId=this.clientId;
        obj.createdBy=this.currentUser.userId;
        this.srvLst.push(obj);
      });
      this.clientApi.createServiceTask( this.srvLst).subscribe((response) => { 
        
        this.bindServiceLst(this.clientId);
        this.closeModal();
      }); 
    }


  editService(item:ServiceTaskView) {
 
    item.isEdit=true;
 
  }

  cancelService(item:ServiceTaskView) {
    item.isEdit=false;
  }

  updateService(item:ServiceTaskView) {
    let reqObj= new ServiceTaskModel(0,item.frequency,item.serviceNote);
    reqObj.taskId=item.taskId;
    reqObj.taskSrvId=item.taskSrvId;
    this.clientApi.updateService(reqObj).subscribe(response => {
      this.bindServiceLst(this.clientId);
      item.isEdit=false;
    });

 
  }

  

  delService(taskSrvId: number) {
    let isOk = confirm("Are you sure to delete?");
    if(isOk)
    {
    this.clientApi.deleteService(taskSrvId).subscribe(response => {
      this.bindServiceLst(this.clientId);
      this.closeModal();
    });
  }
  }

  manageTask() {
    this.modalRef?.hide();
    this.routers.navigate(['/common/task'])
  }
















 }























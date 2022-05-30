import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { MasterService } from 'src/app/services/master.service';
import {  TaskModel}  from 'src/app/models/client/service-task-model';
import { UserModel } from 'src/app/models/account/login-model';

@Component({
  selector: 'app-task-master',
  templateUrl: './task-master.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './task-master.component.scss']
})
export class TaskMasterComponent implements OnInit {
  IsLoad: boolean = false;
  model = new TaskModel();
  taskLst:TaskModel[]=[];
  currentUser:UserModel;

  btSave:string="Save";
  constructor(
    private route:ActivatedRoute,
    private comApi: CommonService,
    private accountApi: AccountService,
    private masterSrv: MasterService) {
    this.currentUser=  this.accountApi.getCurrentUser();
    this.bindTaskList();
 
   }

  ngOnInit(): void {
  }


  addNewTask() {
    
    this.model.createdBy=this.currentUser.userId;
    const reqObj: TaskModel = this.model;
if(this.model.taskId>0)
{
    this.masterSrv.updateTask(reqObj).subscribe((response) => {
      this.bindTaskList();
      this.model.taskCode="";
      this.model.taskName="";
      this.btSave="Save";
    });
}
else
{
  this.comApi.createTask(reqObj).subscribe((response) => { 
    this.bindTaskList();
    this.model.taskCode="";
    this.model.taskName="";
  });

}


  
  }


  bindTaskList() {
    this.comApi.getTaskList().subscribe((response) => {
      if(response.result)
      {
        this.taskLst = response.data;
      }
    });
  }


  updateTask(item: TaskModel) {

    this.model.taskCode=item.taskCode;
    this.model.taskName=item.taskName;
    this.model.taskId=item.taskId;
    this.btSave="Save Changes";


  }


  delTask(taskId:number) {

let isOk = confirm("Are you sure to delete?");
if(isOk)
{
  this.masterSrv.delTask(taskId).subscribe((response) => {
    this.bindTaskList();
  });
}
   
  }

}


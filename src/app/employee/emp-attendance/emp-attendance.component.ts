import { Component, OnInit,TemplateRef ,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ItemsList } from 'src/app/models/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Attendance } from '../../models/employee/attendance';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
@Component({
  selector: 'app-emp-attendance',
  templateUrl: './emp-attendance.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',    
    './emp-attendance.component.scss']
})
export class EmpAttendanceComponent implements OnInit {
  modalRef?: BsModalRef;
  @ViewChild("template") templatelog: TemplateRef<any>;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "my-modal"
  };
  model = new Attendance(0, 0, '','',  '', '');
  currentUser:UserModel;
  ClientList = Array<ItemsList>();
  attendanceObjList: any;

  _startDate:Date;
  _endDate:Date;

  constructor(
    private comApi: CommonService,
    private route:ActivatedRoute,
    private modalService: BsModalService, private empApi: EmployeeapiService,
    private accountApi: AccountService,
    private clientapi : ClientApiService,
    private datepipe: DatePipe,) {
    setTheme('bs3');
    this.currentUser=this.accountApi.getCurrentUser();
    this.model.entityId=0;

    this.comApi.getClientList().subscribe((response) => {
      if(response.result)
      {
     
        this.ClientList = response.data;
      }
    });


   }

  ngOnInit(): void {
      

    this.route.params.subscribe(
      (params : Params) =>{
         this.model.empId = Number(params["empId"]);
         this.getAttendanceList(this.model.empId);
      }
    );

   
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  decline(): void {
   
    this.modalRef?.hide();
  }

  saveAttendance() {
    debugger;

    this.model.entityId=Number(this.model.entityId);
    this.model.startDate=this.datepipe.transform(this._startDate, 'dd-MM-yyyy')||"";
    this.model.endDate=this.datepipe.transform(this._endDate, 'dd-MM-yyyy')||"";
    this.model.userId=Number(this.model.empId);
    this.model.createdBy=this.currentUser.userId;
    const reqObj: Attendance = this.model;
    this.empApi.saveAttendance(reqObj).subscribe((response) => {
      this.decline();
      this.getAttendanceList(reqObj.empId);
      this.model.entityId=0;

      this.model.notes="";
      this.model.reason="";
      this._startDate=new Date();
      this._endDate=new Date();
    });
  }

  getAttendanceList(empId : number) {
    this.empApi.getAttendanceList(empId).subscribe((response) => {
      this.attendanceObjList = response.data;
      console.log(this.attendanceObjList);
    });
  }

  editItem(_item:Attendance)
  {
  
    this.model.entityId=_item.attendanceId;
    this.model.notes=_item.notes;
    this.model.reason=_item.reason;
    this._startDate=new Date(_item.startDate);
    this._endDate=new Date(_item.endDate);
    this.openModal(this.templatelog);
  }

  delItem(attendanceId:number)
  {
    let isOk = confirm("Are you sure to delete?");
  if(isOk)
  {
    this.empApi.delAttendance(attendanceId).subscribe((response) => {
      this.getAttendanceList(this.model.empId);
    });
  }
  }

}

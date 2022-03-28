import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { EmployeeapiService } from 'src/app/Service/employeeapi.service';
import { ClientApiService } from 'src/app/Service/client-api.service';
import { ItemsList } from 'src/app/Model/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Attendance } from '../../Model/Employee/attendance';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-emp-attendance',
  templateUrl: './emp-attendance.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',    
    './emp-attendance.component.scss']
})
export class EmpAttendanceComponent implements OnInit {
  modalRef?: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "my-modal"
  };
  model = new Attendance(0, 0, '','',  '', '');

  ClientList = Array<ItemsList>();
  attendanceObjList: any;
  // bsInlineValue = new Date();
  // ;
  // maxDate = new Date();
  constructor(
    private comApi: CommonService,
    private route:ActivatedRoute,
    private modalService: BsModalService, private empApi: EmployeeapiService, private clientapi : ClientApiService) {
    setTheme('bs3');
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
    // this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];

    this.comApi.getClientList().subscribe((response) => {
      if(response.result)
      {
        debugger;
        this.ClientList = response.data;
      }
    });


   }

  ngOnInit(): void {
      
debugger;
    this.route.params.subscribe(
      (params : Params) =>{
         this.model.empId = Number(params["eId"]);
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
    // debugger;
    //this.model.clientId=Number(this.model.clientId);
    const reqObj: Attendance = this.model;
    console.log('Search', reqObj);
    this.empApi.saveAttendance(reqObj).subscribe((response) => {
      this.decline();
      this.getAttendanceList(reqObj.empId);
    });
  }



  getAttendanceList(empId : number) {
    this.empApi.getAttendanceList(empId).subscribe((response) => {
      this.attendanceObjList = response.data;
      console.log(this.attendanceObjList);
    });
  }


}

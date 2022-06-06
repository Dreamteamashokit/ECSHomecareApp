import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientContactLog } from 'src/app/models/client/client-contactlog-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList, MasterType } from 'src/app/models/common';
import { LoginModel, UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';

import { DatePipe } from '@angular/common';
import { Usertype } from 'src/app/commanHelper/usertype';
@Component({
  selector: 'app-client-contactlog-list',
  templateUrl: './client-contactlog-list.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './client-contactlog-list.component.scss']
})
export class ClientContactlogListComponent implements OnInit {

  _time:Date;
  _reportedDate = new Date();

  modalRef?: BsModalRef;
  ClientId: number;
  ClientContactLogObjList: any;
  empList = Array<ItemsList>();
  OfficeUserList: ItemsList[] = [];
  model = new ClientContactLog();
  currentUser: UserModel;
  @ViewChild("templatelog") templatelog: TemplateRef<any>;
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;
  contactLogId: number = 0;
  constructor(
    private comApi: CommonService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private clientapi: ClientApiService,
    private datepipe: DatePipe
  ) {
    this.model.isActive = 1;
    this._time=new Date();
    this.currentUser = this.accountApi.getCurrentUser();
    this.comApi.getEmpList().subscribe((response) => {
      if (response.result) {
        this.empList = response.data;
      }
    });
    this.comApi.getUsers(Usertype.Coordinators).subscribe((response) => {
      if (response.result) {
        this.OfficeUserList = response.data;
      }
    });


  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.isAddVisible = true;
        this.isUpdateVisible = false;
        this.model.userId = Number(params["clientId"]);
        this.ClientId = Number(params["clientId"]);
        this.getClientContactLogRecord();
      }
    );
  }

  saveContactLog() {
        
    this.model.officeUserId = Number(this.model.officeUserId);
    this.model.empId = Number(this.model.empId);
    this.model.reason = this.model.reason;


    this.model.CallLogDateTime= (this.datepipe.transform(this._reportedDate, 'dd-MM-yyyy')||"") +', '+  (this.datepipe.transform(this._time, 'hh:mm:ss a')||"" );

    this.model.scheduleDate = this.model.scheduleDate;
    this.model.followUpDate = this.model.followUpDate;
    this.model.issue = this.model.issue;
    this.model.notes = this.model.notes;
    this.model.actionTaken = this.model.actionTaken;
    this.model.isFollowUp = this.model.isFollowUp;
    this.model.isSchedule = this.model.isSchedule;
    this.model.isActive = Number(this.model.isActive);
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.model.userId);
    this.clientapi.SaveClientContactLog(this.model).subscribe(Responce => {
      this.decline();
      this.getClientContactLogRecord();
    })
  }

  getClientContactLogRecord() {
    this.clientapi.getClientContactLogRecord(this.ClientId).subscribe(Responce => {

      this.ClientContactLogObjList = Responce.data;
    });
  }
  updateContactLogData(contactlogId: number) {
    this.contactLogId = contactlogId;
    this.clientapi.getClientContactLogDetails(contactlogId).subscribe(Responce => {
      if (Responce.data.length > 0) {
        this.model.officeUserId = Number(Responce.data[0].officeUserId);
        this.model.empId = Number(Responce.data[0].empId);
        this.model.reason = Responce.data[0].reason;


        this.model.callDateTime = new Date(Responce.data[0].callDateTime);


        this.model.scheduleDate = new Date(Responce.data[0].scheduleDate);
        this.model.followUpDate = new Date(Responce.data[0].followUpDate);
        this.model.issue = Responce.data[0].issue;
        this.model.notes = Responce.data[0].notes;
        this.model.actionTaken = Responce.data[0].actionTaken;
        this.model.isFollowUp = Responce.data[0].isFollowUp;
        this.model.isSchedule = Responce.data[0].isSchedule;
        this.isAddVisible = false;
        this.isUpdateVisible = true;
        this.openModal(this.templatelog);
      }
    });
  }

  updateContactLog() {
        
    this.model.officeUserId = Number(this.model.officeUserId);
    this.model.empId = Number(this.model.empId);
    this.model.reason = this.model.reason;
    this.model.callDateTime = this.model.callDateTime;

    this.model.CallLogDateTime= (this.datepipe.transform(this._reportedDate, 'dd-MM-yyyy')||"") +', '+  (this.datepipe.transform(this._time, 'hh:mm:ss a')||"" );

    this.model.scheduleDate = this.model.scheduleDate;
    this.model.followUpDate = this.model.followUpDate;
    this.model.issue = this.model.issue;
    this.model.notes = this.model.notes;
    this.model.actionTaken = this.model.actionTaken;
    this.model.isFollowUp = this.model.isFollowUp;
    this.model.isSchedule = this.model.isSchedule;
    this.model.contactlogId = this.contactLogId;
    this.clientapi.updateClientContactLog(this.model).subscribe(Responce => {
          
      this.decline();
      this.getClientContactLogRecord();
    })
  }
  deleteDeleteContactLogData(contactlogId: number) {

    let isOk = confirm("Are you sure to delete?");
    if(isOk)
    {
      this.clientapi.deleteClientContactLog(contactlogId).subscribe((response) => {
        this.getClientContactLogRecord();
        this.decline();
      });
    }

   
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {
    this.model = new ClientContactLog();
    this.modalRef?.hide();
  }
}

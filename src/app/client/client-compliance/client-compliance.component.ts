import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientCommunityMaster } from 'src/app/models/client/client-community-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList, MasterType, SelectList } from 'src/app/models/common';
import { LoginModel, UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { DocumentService } from 'src/app/services/document.service';
import { ClientCompliance } from 'src/app/models/client/client-compliance-model';
@Component({
  selector: 'app-client-compliance',
  templateUrl: './client-compliance.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css', './client-compliance.component.scss']
})
export class ClientComplianceComponent implements OnInit {
  modalRef?: BsModalRef;
  ClientId: number;
  ClientCompObjList: any;
  empList = Array<ItemsList>();
  model = new ClientCompliance();
  currentUser: UserModel;
  @ViewChild("templatecompliance") templatecompliance: TemplateRef<any>;
  clientComplianceId: number = 0;
  category: ItemsList[] = [];
  subCategory: ItemsList[] = [];
  folders: any;
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;
  isSubCategory: Boolean = false;
  isScreenDate: Boolean = false;
  isSignedDate: Boolean = false;
  isMdOrderDate: Boolean = false;
  EmpId: number;
  constructor(
    private comApi: CommonService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private clientapi: ClientApiService,
    private DocApi: DocumentService
  ) {
    this.model.isActive = 1;
    this.currentUser = this.accountApi.getCurrentUser();
    this.comApi.getEmpList().subscribe((response) => {
      if (response.result) {
        this.empList = response.data;
      }
    });
    this.comApi.getCategoryList().subscribe(Response => {
      this.category = Response.data;
    });
    this.comApi.getSubCategoryList().subscribe(Response => {
      this.subCategory = Response.data;
    });
    //this.GetCategoryList();
    // this.GetSubCategoryList();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.isAddVisible = true;
        this.isUpdateVisible = false;
        this.model.userId = Number(params["clientId"]);
        this.ClientId = Number(params["clientId"]);
        //  this.EmpId = Number(params["empId"]);
        this.GetFolderList(this.ClientId);
        this.getClientComplianceRecords();
      }
    );
  }
  GetFolderList(empid: number) {
    debugger;
    this.DocApi.GetFolderList(empid).subscribe(Response => {
      this.folders = Response.data;
    });
  }
  GetCategoryList() {
    this.comApi.getCategoryList().subscribe(Response => {
      this.category = Response.data;
    });
  }
  GetSubCategoryList() {
    this.comApi.getSubCategoryList().subscribe(Response => {
      this.subCategory = Response.data;
    });
  }
  getClientComplianceRecords() {
    this.model = new ClientCompliance();
    this.model.userId = this.ClientId;
    this.clientapi.getClientComplianceRecords(this.model).subscribe((Response: any) => {
      this.ClientCompObjList = Response.data;
      this.isAddVisible = true;
      this.isUpdateVisible = false;
    })
  }
  saveCompliance() {
    this.model.dueDate = this.model.dueDate;
    this.model.completedOn = this.model.completedOn;
    this.model.category = Number(this.model.category);
    this.model.screenDate = this.model.screenDate;
    if (this.model.subCategory == undefined) {
      this.model.subCategory = 0;
    }
    else {
      this.model.subCategory = Number(this.model.subCategory);
    }
    this.model.signedDate = this.model.signedDate;
    this.model.mDOrderFdate = this.model.mDOrderFdate;
    this.model.mDOrderEDate = this.model.mDOrderEDate;
    this.model.isReceived = this.model.isReceived;
    this.model.attachFile = Number(this.model.attachFile);
    this.model.empId = Number(this.model.empId);
    this.model.officeUserId = Number(this.model.officeUserId);
    if (this.model.isNotifyViaText)
      this.model.isNotifyViaText = 1
    else
      this.model.isNotifyViaText = 0
    if (this.model.isNotifyViaScreen)
      this.model.isNotifyViaScreen = 1
    else
      this.model.isNotifyViaScreen = 0
    if (this.model.isNotifyViaEmail)
      this.model.isNotifyViaEmail = 1
    else
      this.model.isNotifyViaEmail = 0

    //this.model.isNotifyViaScreen = this.model.isNotifyViaScreen;
    //  this.model.isNotifyViaEmail = this.model.isNotifyViaEmail;
    this.model.notes = this.model.notes;
    this.model.status = this.model.status;
    this.model.isActive = 1;
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.model.userId);
    this.clientapi.SaveClientCompliance(this.model).subscribe(Responce => {
      this.decline();
      this.getClientComplianceRecords();
    })
  }
  updateCompliance() {
    this.model.dueDate = this.model.dueDate;
    this.model.completedOn = this.model.completedOn;
    this.model.category = Number(this.model.category);
    this.model.screenDate = this.model.screenDate;
    if (this.model.subCategory == undefined) {
      this.model.subCategory = 0;
    }
    else {
      this.model.subCategory = Number(this.model.subCategory);
    }
    this.model.signedDate = this.model.signedDate;
    this.model.mDOrderFdate = this.model.mDOrderFdate;
    this.model.mDOrderEDate = this.model.mDOrderEDate;
    this.model.isReceived = this.model.isReceived;
    this.model.attachFile = Number(this.model.attachFile);
    this.model.empId = Number(this.model.empId);
    this.model.officeUserId = Number(this.model.officeUserId);
    if (this.model.isNotifyViaText)
      this.model.isNotifyViaText = 1
    else
      this.model.isNotifyViaText = 0
    if (this.model.isNotifyViaScreen)
      this.model.isNotifyViaScreen = 1
    else
      this.model.isNotifyViaScreen = 0
    if (this.model.isNotifyViaEmail)
      this.model.isNotifyViaEmail = 1
    else
      this.model.isNotifyViaEmail = 0
    this.model.notes = this.model.notes;
    this.model.status = this.model.status;
    this.model.isActive = 1;
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.model.userId);
    this.model.clientComplianceId = Number(this.model.clientComplianceId);
    this.clientapi.updateClientCompliance(this.model).subscribe(Responce => {
      this.decline();
      this.getClientComplianceRecords();
    })

  }
  updateComplianceRecord(compId: number) {
    debugger;
    this.clientComplianceId = compId;
    this.model.clientComplianceId = this.clientComplianceId;
    this.clientapi.getClientComplianceRecordDetails(this.model).subscribe((Responce: any) => {
      if (Responce.data.length > 0) {
        this.model.dueDate = new Date(Responce.data[0].dueDate);
        this.model.completedOn = new Date(Responce.data[0].completedOn);
        this.model.category = Number(Responce.data[0].category);
        if (Responce.data[0].screenDate == null) {
          this.isScreenDate = false;
        }
        else {
          this.model.screenDate = new Date(Responce.data[0].screenDate);
          this.isScreenDate = true;
        }
        if (Responce.data[0].subCategory == 0) {
          this.isSubCategory = false;
        }
        else {
          this.model.subCategory = Number(Responce.data[0].subCategory);
          this.isSubCategory = true;
        }

        if (Responce.data[0].signedDate == null) {
          this.isSignedDate = false;
        }
        else {
          this.model.signedDate = new Date(Responce.data[0].signedDate);
          this.isSignedDate = true;
        }
        if (Responce.data[0].mDOrderFdate == null) {
          this.isMdOrderDate = false;
        }
        else {
          this.model.mDOrderFdate = new Date(Responce.data[0].mDOrderFdate);
          this.isMdOrderDate = true;
        }
        if (Responce.data[0].mDOrderEDate == null) {
          this.isMdOrderDate = false;
        }
        else {
          this.model.mDOrderEDate = new Date(Responce.data[0].mDOrderEDate);
          this.isMdOrderDate = true;
        }
        this.model.isReceived = Responce.data[0].isReceived;

        if (this.model.isReceived == 0) {
          this.isMdOrderDate = false;
        }
        else {
          this.isMdOrderDate = true;
        }

        this.model.attachFile = Number(Responce.data[0].attachFile);
        this.model.empId = Number(Responce.data[0].empId);
        this.model.officeUserId = Number(Responce.data[0].officeUserId);
        this.model.isNotifyViaText = Responce.data[0].isNotifyViaText;
        this.model.isNotifyViaScreen = Responce.data[0].isNotifyViaScreen;
        this.model.isNotifyViaEmail = Responce.data[0].isNotifyViaEmail;
        this.model.notes = Responce.data[0].notes;
        this.model.status = Responce.data[0].status;
        this.isAddVisible = false;
        this.isUpdateVisible = true;
        this.openModal(this.templatecompliance);
      }
    });
  }
  deleteComplianceRecord(compId: number) {
    debugger;
    this.clientComplianceId = compId;
    this.model.clientComplianceId = this.clientComplianceId;
    this.clientapi.deleteClientCompliance(this.model).subscribe((response) => {
      this.getClientComplianceRecords();
      this.decline();
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {
    this.model = new ClientCompliance();
    this.isSubCategory = false;
    this.isScreenDate = false;
    this.isSignedDate = false;
    this.isMdOrderDate = false;
    this.modalRef?.hide();
  }
  onCategoryChange(event: any) {
    debugger;
    var selectedText = event.target.options[event.target.options.selectedIndex].text;
    if (selectedText == "Assessment") {
      this.isScreenDate = true;

      this.isSubCategory = false;
      this.isSignedDate = false;
      this.isMdOrderDate = false;
    }
    if (selectedText == "Assessment Addendum") {
      this.isScreenDate = true;

      this.isSubCategory = false;
      this.isSignedDate = false;
      this.isMdOrderDate = false;
    }
    if (selectedText == "Client Intake") {
      this.isSubCategory = true;

      this.isScreenDate = false;
      this.isSignedDate = false;
      this.isMdOrderDate = false;
    }
    if (selectedText == "Forms") {
      this.isSubCategory = true;
      this.isScreenDate = false;
      this.isSignedDate = false;
      this.isMdOrderDate = false;
    }
    if (selectedText == "Legal Pack") {
      this.isSignedDate = true;
      this.isScreenDate = false;
      this.isSubCategory = false;
      this.isMdOrderDate = false;
    }
    if (selectedText == "MD Order") {
      this.isMdOrderDate = true;
      this.isScreenDate = false;
      this.isSubCategory = false;
      this.isSignedDate = false;
    }
  }
}

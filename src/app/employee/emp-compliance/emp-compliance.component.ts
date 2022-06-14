import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ItemsList } from 'src/app/models/common';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ComplianceModel } from 'src/app/models/employee/compliance-obj';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import { MasterService } from 'src/app/services/master.service';
@Component({
  selector: 'app-emp-compliance',
  templateUrl: './emp-compliance.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-compliance.component.scss']
})
export class EmpComplianceComponent implements OnInit {


  modalRef?: BsModalRef;
  model = new ComplianceModel();
  empList = Array<ItemsList>();
  nurseList = Array<ItemsList>();
  categoryList: ItemsList[];
  subCategoryList: ItemsList[];
  currentUser: UserModel;
  complianceList: ComplianceModel[] = [];
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;

  @ViewChild("template") templateCategory: TemplateRef<any>;
  constructor(
    private comApi: CommonService,
    private route: ActivatedRoute,
    private accountApi: AccountService,
    private modalService: BsModalService, private empApi: EmployeeapiService) {
    setTheme('bs3');
    this.currentUser = this.accountApi.getCurrentUser();
    this.comApi.getEmpList().subscribe((response) => {
      if (response.result) {
        this.empList = response.data;
      }
    });
    this.comApi.getEmployees(5).subscribe((response) => {
      if (response.result) {
        this.nurseList = response.data;
      }
    });
    this.comApi.getCMPLCategoryList(0).subscribe((response) => {
      if (response.result) {
        this.categoryList = response.data;
      }
    });
  }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.model.userId = Number(params["empId"]);
        this.getCompliance(this.model.userId);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  decline(): void {
    this.modalRef?.hide();
  }


  onSelectCategory(e: any): void {

    let id = Number(e.target.value) | 0;
    if (id != 0) {
      this.bindCodeList(id);
    }
  }

  bindCodeList(catId: number) {
    this.comApi.getCMPLCategoryList(catId).subscribe((response) => {
      if (response.result) {
        this.subCategoryList = response.data;
       
      }
  
    });
  }




  saveCompliance() {
    debugger;
    this.model.userId = Number(this.model.userId);
    this.model.nurse = Number(this.model.nurse) | 0;
    this.model.categoryId = Number(this.model.categoryId);
    this.model.codeId = Number(this.model.codeId);
    this.model.createdBy = this.currentUser.userId;
    const reqObj: ComplianceModel = this.model;
    console.log('Search', reqObj);
    this.empApi.addCompliance(reqObj).subscribe((response) => {
      this.decline();
      this.getCompliance(reqObj.userId);

      this.model.nurse = 0
      this.model.categoryId = 0;
      this.model.codeId = 0;
      this.model.completedOn = undefined;
      this.model.notes = '';
      this.model.result = '';
    });
  }

  getCompliance(userId: number) {
    this.empApi.getComplianceList(userId).subscribe((response) => {
      if (response.result) {
        this.complianceList = response.data;
        console.log(response.data);
      }
    });
  }

  editItem(_item: ComplianceModel) {
    this.bindCodeList(_item.categoryId);
    this.model.complianceId = _item.complianceId;
    this.model.userId = _item.userId;
    this.model.nurse = _item.nurse;
    this.model.categoryId = _item.categoryId;
    this.model.codeId = _item.codeId;
    this.model.dueDate = new Date(_item.dueDate);
    this.model.completedOn = _item.completedOn != null ? new Date(_item.completedOn) : undefined;
    this.model.notes = _item.notes;
    this.openModal(this.templateCategory);
  }

  delItem(complianceId: number) {
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.empApi.deleteCompliance(complianceId).subscribe((response) => {
        this.getCompliance(this.model.userId);
      });
    }
  }




}

import { Component, OnInit,TemplateRef, ViewChild  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ItemsList } from 'src/app/models/common';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ComplianceObj } from 'src/app/models/employee/compliance-obj';
import { Router,ActivatedRoute, Params } from '@angular/router';
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
  model = new ComplianceObj(0, 0, -1,  '', '','', '','', '');
  EmplList = Array<ItemsList>(); 
  nurseList = Array<ItemsList>(); 
  complianceId: number = 0;
  categoryList: any;
  subCategoryList: any;
  currentUser:UserModel;
  complianceObjList: any;
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;
  @ViewChild("template") templateCategory: TemplateRef<any>;
  constructor(
    private comApi: CommonService,
    private mstrApi: MasterService,
    private route:ActivatedRoute,
    private accountApi: AccountService,
    private modalService: BsModalService, private empApi: EmployeeapiService) {
    setTheme('bs3');
    this.currentUser=this.accountApi.getCurrentUser();
   
    this.comApi.getEmpList().subscribe((response) => {
      if(response.result)
      {     
        this.EmplList = response.data;
      }
    });

    this.comApi.getEmployees(5).subscribe((response) => {
      if(response.result)
      { 
      this.nurseList = response.data;
      }
    });

    this.mstrApi.GetCategoryList().subscribe((response) => {
      if(response.result)
      {       
        this.categoryList = response.data;       
      }
  }); 

   }


   ngOnInit(): void {

    this.route.params.subscribe(
      (params : Params) =>{
         this.model.empId = Number(params["empId"]);
         this.getCompliance(this.model.empId);
      }
    );

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  decline(): void {
   
    this.modalRef?.hide();
  }

  saveCompliance() {

    this.model.userId=Number(this.model.empId);
    this.model.createdBy=this.currentUser.userId;
    this.model.empId=Number(this.model.empId);
    this.model.nurse=Number(this.model.nurse);

    const reqObj: ComplianceObj = this.model;
    console.log('Search', reqObj);
    this.empApi.saveCompliance(reqObj).subscribe((response) => {
      this.decline();
      this.getCompliance(reqObj.empId);
    });
  }

  
  getCompliance(empId : number) {
    this.empApi.geComplianceList(empId).subscribe((response) => {
      this.complianceObjList = response.data;
      console.log(response);
    });
  }

  OnChangeCategory(e: any): void {
   
    this.mstrApi.GetSubCategoryList(e.target.value).subscribe((response) => {
      this.subCategoryList = response.data;
    });
  }

  updateCompliance(clientComplianceId: number) {

    this.complianceId = clientComplianceId;
    this.empApi.GetComplianceDetails(this.complianceId).subscribe((responce) => {   
      if (responce.result) {
        this.model.category = responce.data.category;
        this.model.completedOn = responce.data.completedOn;
        this.model.code = responce.data.code;
        this.model.complianceId = responce.data.complianceId;
        this.model.createdBy = responce.data.createdBy;
        this.model.createdOn = responce.data.createdOn;
        this.model.dueDate = responce.data.dueDate;
        this.model.empId = this.currentUser.userId;
        this.model.entityId = responce.data.entityId;
        this.model.notes = responce.data.notes;
        this.model.nurse = responce.data.nurse;
        this.model.result = responce.data.result;
        this.isAddVisible = false;
        this.isUpdateVisible = true;
        this.openModal(this.templateCategory);
      }
    });
  }

  deleteCompliance(clientComplianceId: number) {  
   this.complianceId = clientComplianceId;
    this.empApi.deleteCompliance(this.complianceId).subscribe(() => {
      this.getCompliance(this.model.empId);
      this.decline();
    });
  }

  updateComplianceData() {
    this.model.createdBy=this.currentUser.userId;
    this.model.empId=Number(this.currentUser.userId);
    this.model.nurse=Number(this.model.nurse);
    this.model.complianceId=Number(this.model.complianceId);
    const reqObj: ComplianceObj = this.model;
    console.log('Search', reqObj);
    this.empApi.updateComplianceData(reqObj).subscribe((response) => {
      this.decline();
      this.getCompliance(reqObj.empId);
    });
  }
}

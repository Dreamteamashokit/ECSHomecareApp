import { Component, OnInit,TemplateRef  } from '@angular/core';
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
  categoryList: any;
  subCategoryList: any;
  currentUser:UserModel;
  complianceObjList: any;
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

}

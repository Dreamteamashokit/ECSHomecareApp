import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ItemsList } from 'src/app/models/common';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ComplianceModel } from 'src/app/models/employee/compliance-obj';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import { MasterService } from 'src/app/services/master.service';
import { FolderView } from 'src/app/models/employee/upload-file-folder';
import { DocumentService } from 'src/app/services/document.service';
import { UserType ,MasterType} from 'src/app/models/common';
@Component({
  selector: 'app-emp-compliance',
  templateUrl: './emp-compliance.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-compliance.component.scss']
})
export class EmpComplianceComponent implements OnInit {

  IsLoad: boolean;
  modalRef?: BsModalRef;
  model = new ComplianceModel();

  categoryList: ItemsList[];
  subCategoryList: ItemsList[];
  currentUser: UserModel;
  complianceList: ComplianceModel[] = [];
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;
  userFileList: FolderView[] = [];

  IsCategory: boolean = false;

  empList: ItemsList[] = [];
  nurseList: ItemsList[] = [];
  statusList: ItemsList[] = [];
  officeUserList: ItemsList[] = [];

  empId: number;
  // officeUserId:number;
  userTypeId: number = 8;
  lblCategory: string = 'Code';

  @ViewChild("template") templateCategory: TemplateRef<any>;
  constructor(
    private router: Router,
    private comApi: CommonService,
    private docSrv: DocumentService,
    private route: ActivatedRoute,
    private accountApi: AccountService,
    private modalService: BsModalService,
    private empApi: EmployeeapiService) {
    setTheme('bs3');
    this.currentUser = this.accountApi.getCurrentUser();


  }





  pageLoad() {

    this.comApi.getEmployees(5).subscribe((response) => {
      if (response.result) {
        this.nurseList = response.data;
      }
    });

    this.comApi.getCMPLCategoryList(0, this.userTypeId).subscribe((response) => {
      if (response.result) {
        this.categoryList = response.data;
      }
    });

    this.comApi.getEmpList().subscribe((response) => {
      this.empList = response.data;
    });


    this.comApi.getUsers(UserType.Coordinators).subscribe((response) => {
      this.officeUserList = response.data;
    });


    this.comApi.getMaster(MasterType.ComplianceStatus).subscribe((response) => {
        
      this.statusList = response.data;
      this.model.isStatus=68;
    });

    this.empId = -1;

    // this.officeUserId=-1;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {

        if (params["empId"] != null) {
          this.model.userId = Number(params["empId"]);
          this.userTypeId = 8;
        }
        else {
          this.model.userId = Number(params["clientId"]);
          this.userTypeId = 9;

          this.lblCategory='SubCategory/Stage';
        }
        this.getCompliance(this.model.userId);
        this.getDocList(this.model.userId);


  


        this.pageLoad();
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
    this.IsLoad = true;
    this.comApi.getCMPLCategoryList(catId, this.userTypeId).subscribe((response) => {
      if (response.result) {
        this.subCategoryList = response.data;
        this.IsLoad = false;
        this.IsCategory = true;
      }
      else {
        this.IsCategory = false;
        this.IsLoad = false;
        this.subCategoryList = [];
      }
    });
  }

  bindCode(catId: number, selCatId: number) {
    this.IsLoad = true;
    this.comApi.getCMPLCategoryList(catId, this.userTypeId).subscribe((response) => {
      if (response.result) {
        this.subCategoryList = response.data;
        let item = this.subCategoryList.filter(x => x.itemId === selCatId)[0];
        this.model.codeId = item.itemId;
        this.IsLoad = false;
        this.IsCategory = true;
      }
      else {
        this.subCategoryList = [];
        this.model.codeId = 0;
        this.IsLoad = false;
        this.IsCategory = false;
      }
    });
  }


  saveCompliance() {

    debugger;
    this.IsLoad = true;
    this.model.userId = Number(this.model.userId);
    this.model.nurseId = Number(this.model.nurseId) | 0;
    this.model.categoryId = Number(this.model.categoryId);
    this.model.codeId = Number(this.model.codeId) | 0;
    this.model.createdBy = this.currentUser.userId;
    this.model.documentId = Number(this.model.documentId) | 0;

    const reqObj: ComplianceModel = this.model;
    console.log('Search', reqObj);
    this.empApi.addCompliance(reqObj).subscribe((response) => {
      this.decline();
      this.getCompliance(reqObj.userId);
      this.IsLoad = false;
      this.model.nurseId = 0
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

    this.bindCode(_item.categoryId, _item.codeId);
    this.model.complianceId = _item.complianceId;
    this.model.userId = _item.userId;
    this.model.nurseId = _item.nurseId;
    this.model.categoryId = _item.categoryId;
    this.model.documentId = _item.documentId;
    this.model.isStatus = _item.isStatus;
    

    //this.model.codeId = _item.codeId;
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


  getDocList(userId: number) {
    this.docSrv.getDocumentlist(userId).subscribe(response => {
      if (response.result) {
        this.userFileList = response.data.filter(x => x.documentList.length > 0);
      }
    });
  }


  addFile(userTypeId: number) {

    debugger;

    if (userTypeId == 8) {
      let currentUrl = '/employee/info/' + this.model.userId + '/11';
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      this.decline();

    }
    else {

      let currentUrl = '/client/info/' + this.model.userId + '/10';
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
      this.decline();

    }




  }









}

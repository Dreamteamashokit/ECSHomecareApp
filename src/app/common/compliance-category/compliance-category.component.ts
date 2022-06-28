import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/common/category';
import { MasterService } from 'src/app/services/master.service';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import { EnumToArrayPipe } from 'src/app/pipe/enum-to-array.pipe';
import { UserType,RecurrTypeEnum,RecurrSrcDateEnum } from 'src/app/models/common';

@Component({
  selector: 'app-compliance-category',
  templateUrl: './compliance-category.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './compliance-category.component.scss']
})
export class ComplianceCategoryComponent implements OnInit {
  model = new CategoryModel();
  categoryList: CategoryModel[];
  parentList: CategoryModel[];
  currentUser: UserModel;
  btSave:string="Save";
  userTypeList:any;
  recurrTypeList:any;
  srcDateList:any;
  constructor(
    private accountApi: AccountService,
    private mstrApi: MasterService,
  ) { 

    this.currentUser = this.accountApi.getCurrentUser();  
    this.getUserType();

    this.getRecurrType();
    this.getRecurrSrcDate();

  }

  ngOnInit(): void {

    this.model.parentId =0;
    this.model.userTypeId=8;
    this.getParentList(0,this.model.userTypeId);
    this.getCategoryList(this.model.userTypeId);
    this.model.recurrType=1;
    this.model.recurrSrcType=1;
  }

  saveCategpryModel() {

    debugger;
    this.model.categoryName = this.model.categoryName;
    this.model.parentId =Number(this.model.parentId) |0;
    this.model.createdBy = this.currentUser.userId;

if(this.model.isRecurring)
{
  this.model.recurrType =Number(this.model.recurrType) |0;
  this.model.recurrValue =Number(this.model.recurrValue) |0;
  this.model.recurrSrcType =Number(this.model.recurrSrcType) |0;
  this.model.recurrNotifyDays =Number(this.model.recurrNotifyDays) |0;
  this.model.recurrDate =new Date(this.model.recurrDate);
  

}




    const reqObj: CategoryModel = this.model;
    this.mstrApi.addCMPLCategory(reqObj).subscribe(response => {      
      this.getCategoryList(this.model.userTypeId);
      this.getParentList(0,this.model.userTypeId);
      this.model.categoryName = "";
    })

}



getParentList(categoryId: number,userTypeId:number) {

  this.mstrApi.getCMPLCategoryList(categoryId,userTypeId).subscribe((response) => {
      if(response.result)
      {       
        this.parentList = response.data;       
      }
  }); 
}



  getCategoryList(userTypeId:number) {
    const response: CategoryModel[] = [];
    this.mstrApi.getCMPLCategoryAllList(userTypeId).subscribe((response) => {
        if(response.result)
        {       
          this.categoryList = response.data;       
        }
        else
        {
          this.categoryList =[];
        }
    }); 
  }

  editItem(_item: CategoryModel) {

    this.model.categoryId = _item.categoryId;
    this.model.categoryName = _item.categoryName;
    this.model.parentId = _item.parentId;

    // this.openModal(this.templatelog);
  }

  delItem(categoryId: number) {
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.mstrApi.delCMPLCategory(categoryId).subscribe((response) => {
        this.getCategoryList(this.model.userTypeId);
        this.getParentList(0,this.model.userTypeId);
      });
    }
  }



  getUserType() {
   this.userTypeList= Object.entries(UserType).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));


  }


  onSelectUserType(e: any): void {

    let id = Number(e.target.value) | 0;
    this.model.userTypeId=id;
    if (id != 0) {
      this.getCategoryList(this.model.userTypeId);
      this.getParentList(0,this.model.userTypeId);
    }
  }



  getRecurrType() {
    this.recurrTypeList= Object.entries(RecurrTypeEnum).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
 
 
   }



   getRecurrSrcDate() {
    this.srcDateList= Object.entries(RecurrSrcDateEnum).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
 
 
   }

  
}




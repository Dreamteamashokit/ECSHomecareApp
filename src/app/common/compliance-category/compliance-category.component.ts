import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/common/category';
import { MasterService } from 'src/app/services/master.service';

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
  btSave:string="Save";
  constructor(
    private mstrApi: MasterService,
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
    //this.getMasterCategoryGridList();
  }

  saveCategpryModel() {
    this.model.categoryName = this.model.categoryName;
    this.model.parentId = Number(this.model.parentId) || 0;
    const reqObj: CategoryModel = this.model;
    this.mstrApi.addCMPLCategory(this.model).subscribe(responce => {      
      this.getCategoryList();
      
      this.model.categoryName = "";
    })
   }

  getCategoryList() {
    const response: CategoryModel[] = [];
    this.mstrApi.getCMPLCategoryAllList().subscribe((response) => {
        if(response.result)
        {       
          this.categoryList = response.data;       
        }
    }); 
  }




  editItem(_item: CategoryModel) {

    this.model.categoryId = _item.categoryId;
    this.model.categoryName = _item.categoryName;
    this.model.parentId = _item.parentId;   
  }

  delItem(categoryId: number) {
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.mstrApi.delCMPLCategory(categoryId).subscribe((response) => {
        this.getCategoryList();
      });
    }
  }









}

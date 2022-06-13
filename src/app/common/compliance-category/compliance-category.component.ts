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
  masterCategoryList: CategoryModel[];
  btSave:string="Save";
  constructor(
    private mstrApi: MasterService,
  ) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.getMasterCategoryGridList();
  }

  saveCategpryModel() {
    this.model.categoryName = this.model.categoryName;
    this.model.parentCategoryId = this.model.parentCategoryId;
    this.mstrApi.SaveCategory(this.model).subscribe(Responce => {      
      this.getCategoryList();
      this.getMasterCategoryGridList();
      this.model.categoryName = "";
    })
   }

  getCategoryList() {
    const response: CategoryModel[] = [];
    this.mstrApi.GetCategoryList().subscribe((response) => {
        if(response.result)
        {       
          this.categoryList = response.data;       
        }
    }); 
  }

  getMasterCategoryGridList() {
    const response: CategoryModel[] = [];
    this.mstrApi.GetMasterCategoryList().subscribe((response) => {
        if(response.result)
        {       
          this.masterCategoryList = response.data;       
        }
    });
  }
}

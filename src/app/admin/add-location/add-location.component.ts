import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UserModel } from 'src/app/models/account/login-model';
import { LocationModel } from 'src/app/admin/model/location-model';
import { AccountService } from 'src/app/services/account.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  currentUser: UserModel;
  model = new LocationModel();
  modelList:LocationModel[]=[];  
  constructor(private comApi: CommonService,
    private route: ActivatedRoute,
    private accountApi: AccountService,
    private locSrv: LocationService)
     {
       this.currentUser = this.accountApi.getCurrentUser();
       this.model.entityId=0;
       this.getModelList();
      }
      
      ngOnInit(): void {
      }



  saveChangesModel() {
    debugger;    
    this.model.createdBy=this.currentUser.userId;
    this.locSrv.addLocation(this.model).subscribe((response) => {
      this.getModelList();
  }); 
}

getModelList() {
this.locSrv.getLocationList().subscribe((response) => {
  if(response.result)
  {
    this.modelList = response.data;
  }});
}







}

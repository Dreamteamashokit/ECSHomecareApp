import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client/client-model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType ,SelectList} from 'src/app/models/common';
import { Usertype } from 'src/app/commanHelper/usertype';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    
    './create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  IsLoad: boolean = false;
  model = new ClientModel();
  statusData: ItemsList[] = [];
  marriedStatusData: ItemsList[] = [];
  genderData: ItemsList[] = [];
  ethnicityData: ItemsList[] = [];
  empTypeList = Array<ItemsList>();
  empList = Array<ItemsList>();
  countryData: SelectList[] = [];
  stateData: SelectList[] = [];
  _dobDate : Date=new Date();
  constructor(private router:Router, 
    public datepipe: DatePipe,
    private comApi: CommonService) 
    {
    
      this.BindMaster();

      this. model.isActive=1;
      this. model.ethnicity=1;
      this. model.gender=1;
      this. model.maritalStatus=1;

     }

  ngOnInit(): void {
  }




  BindMaster()
  {
    this.comApi.getMaster(MasterType.Status).subscribe((response) => {
      this.statusData = response.data;
    });
    this.comApi.getMaster(MasterType.MaritalStatus).subscribe((response) => {
      this.marriedStatusData = response.data;
    });
    this.comApi.getMaster(MasterType.Gender).subscribe((response) => {
      this.genderData = response.data;
    });
    this.comApi.getMaster(MasterType.Ethnicity).subscribe((response) => {
      this.ethnicityData = response.data;
    });
   
    this.comApi.getEmpTypeList().subscribe((response) => {
      this.empTypeList = response.data;
    });
    this.comApi.getEmpList().subscribe((response) => {
      this.empList = response.data;
    });

  }





  saveChanges() {

    debugger;
    this.IsLoad = true;
    this.model.dob = this.datepipe.transform(this._dobDate, 'dd-MM-yyyy')||"";   
    this.model.isActive=Number(this.model.isActive);
    this.model.ethnicity=Number(this.model.ethnicity);
    this.model.gender=Number(this.model.gender);
    this.model.maritalStatus=Number(this.model.maritalStatus);
    this.model.supervisorId=Number(this.model.supervisorId);
    this.model.nurseId=Number(this.model.nurseId);
    this.model.userType=Number(Usertype.Client);
    const empObj: ClientModel = this.model;
  
  }















}

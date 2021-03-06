import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ClientModel } from 'src/app/models/client/client-model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType ,SelectList} from 'src/app/models/common';
import { UserType } from 'src/app/models/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    
    './new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  IsLoad: boolean = false;
  model = new ClientModel();
  statusData: ItemsList[] = [];
  marriedStatusData: ItemsList[] = [];
  genderData: ItemsList[] = [];
  ethnicityData: ItemsList[] = [];
  empTypeList = Array<ItemsList>();
  empList = Array<ItemsList>();
  nurseList = Array<ItemsList>();
  countryData: SelectList[] = [];
  stateData: SelectList[] = [];
  _dobDate : Date=new Date();

  @ViewChild('empf') public empFrm: NgForm;
  constructor(private router:Router, 
    public datepipe: DatePipe,
    private cltApi : ClientApiService,
    private comApi: CommonService) {
    
      this.BindMaster();
      
      this. model.isActive=1;
      this. model.ethnicity=1;
      this. model.gender=1;
      this. model.maritalStatus=1;
      this.model.nurseId=0;

     }

  ngOnInit(): void {
  }

  OnChangeCountry(e: any): void {
    this.comApi.getStateList(e.target.value).subscribe((response) => {
      this.stateData = response.data;
    });
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
 
    this.comApi.getUsers(UserType.Coordinators).subscribe((response) => {
      this.empList = response.data;
    });

    this.comApi.getEmployees(5).subscribe((response) => {
      this.nurseList = response.data;
    });
    


  }





  saveChanges() {

      
    this.IsLoad = true;
    this.model.dob = this.datepipe.transform(this._dobDate, 'dd-MM-yyyy')||"";   
    this.model.isActive=Number(this.model.isActive);
    this.model.ethnicity=Number(this.model.ethnicity);
    this.model.gender=Number(this.model.gender);
    this.model.maritalStatus=Number(this.model.maritalStatus);
    this.model.supervisorId=Number(this.model.supervisorId);
    this.model.nurseId=Number(this.model.nurseId);
    this.model.userType=Number(UserType.Client);
    const empObj: ClientModel = this.model;

    
    this.cltApi.addClient(empObj).subscribe((response) => {

      this.IsLoad = false;
      console.log('Stock change Response: ', response);
      this.clear();
      this.model.clientId=response.data
      
      this.router.navigate(['/client/info/'+this.model.clientId+'/5']);
    });
  }



  clear() {

    this.empFrm.resetForm(); 
  }



}

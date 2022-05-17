import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { EmployeeModel } from 'src/app/models/employee/employee-model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType ,SelectList} from 'src/app/models/common';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';

import{Usertype} from 'src/app/commanHelper/usertype'
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  currentUser:UserModel;
  IsLoad: boolean = false;
  model = new EmployeeModel();
  statusData: ItemsList[] = [];
  marriedStatusData: ItemsList[] = [];
  genderData: ItemsList[] = [];
  ethnicityData: ItemsList[] = [];
  empTypeList = Array<ItemsList>();
  empList = Array<ItemsList>();
  countryData: SelectList[] = [];
  stateData: SelectList[] = [];

  constructor(private router:Router,  
    private accountApi: AccountService,
    public datepipe: DatePipe,
    private empApi : EmployeeapiService,
    private comApi: CommonService) {
      this.currentUser=this.accountApi.getCurrentUser();
      this.BindMaster();

      this. model.isActive=1;
      this. model.enthnicity=1;
      this. model.gender=1;
      this. model.maritalStatus=1;

      this. model.country='';
      this. model.taxState='';
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
    this.comApi.getCountryList().subscribe((response) => {
      this.countryData = response.data;
    });
    this.comApi.getEmpTypeList().subscribe((response) => {
      this.empTypeList = response.data;
    });
  
    this.comApi.getUsers(Usertype.Coordinators).subscribe((response) => {
      this.empList = response.data;
    });







  }
  _dobDate : Date=new Date();
  _dateOfHire : Date=new Date();
  _dateOfFirstCase : Date=new Date();


  saveChanges() {
    this.IsLoad = true;    
    this.model.userId=Number(0);
    this.model.dateOfHire = this.datepipe.transform(this._dateOfHire, 'dd-MM-yyyy')||"";   
    this.model.dateOfFirstCase = this.datepipe.transform(this._dateOfFirstCase, 'dd-MM-yyyy')||"";   
    this.model.dob = this.datepipe.transform(this._dobDate, 'dd-MM-yyyy')||"";   
    this.model.createdBy=this.currentUser.userId;
    this.model.isActive=Number(this.model.isActive);
    this.model.empType=Number(this.model.empType);
    this.model.enthnicity=Number(this.model.enthnicity);
    this.model.gender=Number(this.model.gender);
    this.model.maritalStatus=Number(this.model.maritalStatus);
    this.model.supervisorId=Number(this.model.supervisorId);
    this.model.userType=Number(Usertype.Employee);
    const empObj: EmployeeModel = this.model;
    this.empApi.addEmployee(empObj).subscribe((response) => {
      this.IsLoad = false;
      console.log('Stock change Response: ', response);
    });
  }





}


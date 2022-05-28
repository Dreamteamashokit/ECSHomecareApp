import { Component, OnInit } from '@angular/core';
import { EmployeeapiService } from  '../services/employeeapi.service';
import { AccountService } from '../services/account.service';
import { DatePipe } from '@angular/common'
import { HHAClockout } from '../models/account/login-model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  IsLoad:boolean = false;
  UserId:number;
  userName:string;
  clockinDetails:any;
  ClientList: any;
  ClientName:string;
  CurrentDate:Date;
  model = new HHAClockout();
  Message:string;
  IsShowMessage:boolean = false;

  constructor(private _employeeService:EmployeeapiService,private _accountService:AccountService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.CurrentDate = new Date();
    var objUser = this._accountService.GetCurrentHHAUser();
    if(objUser != null && objUser != undefined){
      this.UserId = objUser.userId;
      this.userName = objUser.firstName + " " + objUser.middleName + " " + objUser.lastName;
     this.GetClockinDetailsByUserId(objUser.userId);
     
     var clientName = localStorage.getItem("SelectedClientName");
      if(clientName != null && clientName != undefined){
        this.ClientName = clientName;
      }
    }
  }

  GetClockinDetailsByUserId(userId:number){
    this._employeeService.GetClockinDetailsByUserId(userId).subscribe((response) =>{
    
      if(response.result)
      {
        this.clockinDetails = response.data;
          this.IsLoad=false;
      }
      else
      {
        this.IsLoad=false;
        alert('HHA/Employee does not have any clients.');
      }
    })
  }

  HHAClockout(model:any){

    this.model = model.value;
    this.model.userId = this.UserId;
    this.model.Type = 2;
    this.model.ClockOutTime = new Date();
    this.model.ClockInTime = new Date();
    this._accountService.HHAClockout(this.model).subscribe((response) => {
      this.IsShowMessage = true;
      this.Message  = "HHA User clock out successfull."
      var that = this;
      setTimeout(function(){
        that.IsShowMessage = false;
      },5000);

    });
  }
}

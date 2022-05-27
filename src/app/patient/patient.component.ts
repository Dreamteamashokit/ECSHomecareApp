import { Component, OnInit } from '@angular/core';
import { EmployeeapiService } from  '../services/employeeapi.service';
import { AccountService } from '../services/account.service';
import { DatePipe } from '@angular/common'

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

  constructor(private _employeeService:EmployeeapiService,private _accountService:AccountService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    var objUser = this._accountService.GetCurrentHHAUser();
    if(objUser != null && objUser != undefined){
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

}

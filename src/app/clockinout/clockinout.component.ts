import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { HHAClockInMode } from '../models/account/login-model';
import { EmployeeapiService } from  '../services/employeeapi.service';

@Component({
  selector: 'app-clockinout',
  templateUrl: './clockinout.component.html',
  styleUrls: ['./clockinout.component.scss']
})
export class ClockinoutComponent implements OnInit {

  UserId:number;
  model = new HHAClockInMode();
  clockinDetails:any;
  IsDisable:boolean = true;
  IsShow:boolean = false;
  HHAMessage: string = "";
  constructor(private _accountService:AccountService,
    private router:Router,private _employeeService:EmployeeapiService) { }

  ngOnInit(): void {
    var objUser = this._accountService.GetCurrentHHAUser();
    if(objUser != null && objUser != undefined){
      this.UserId = objUser.userId;
    }
    var disableClockout = localStorage.getItem("ShowClockOutButton");
    if(disableClockout != null && disableClockout != undefined){
      var btnclockout = localStorage.getItem("ShowClockOutButton");
      if(btnclockout != null && btnclockout != undefined){
        this.IsDisable = JSON.parse(btnclockout);
      }
    }
  }

  HHAClockIn(Notes:string,Type:number){
  
    this.model.userId = this.UserId;
    if(Notes != null && Notes != undefined){
      this.model.Notes = Notes; 
    }
    else{
      this.model.Notes = "";
    }
     
    this.model.Type = Type;
    this._accountService.HHAClockIn(this.model).subscribe((response) => {
      
      if(response.result)
      {
        if(Type == 2){
          this.IsShow = false;
          localStorage.removeItem('ShowClockOutButton');
          this.router.navigate(['/hhapatinet']);
        }
        else{
          this.IsDisable = false;
          var that = this;
          this.IsShow = true;
          this.HHAMessage  = "HHA User clock in successfull."
          localStorage.setItem('ShowClockOutButton',JSON.stringify(this.IsDisable));
          setTimeout(function(){
            that.IsShow = false;
          },5000);
        }
      }
      else{
        this.HHAMessage = "HHA User does not exists.";
      }
    });     
  }


  GetClockinDetailsByUserId(userId:number){
    this._employeeService.GetClockinDetailsByUserId(userId).subscribe((response) =>{
      
      if(response.result)
      {
        this.clockinDetails = response.data;
      }
      else
      {
        this.HHAMessage  = "HHA/Employee does not have any clients.";
      }
    })
  }

}

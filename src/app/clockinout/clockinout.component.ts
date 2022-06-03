import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { HHAClockInMode } from '../models/account/login-model';
import { EmployeeapiService } from  '../services/employeeapi.service';
import { DatePipe } from '@angular/common'

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
  SelectedClient:any;
  CurrentDate:Date;


  constructor(private _accountService:AccountService,public datepipe: DatePipe,
    private router:Router,private _employeeService:EmployeeapiService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.CurrentDate = new Date();
    }, 1000);
    var objUser = this._accountService.GetCurrentHHAUser();
    if(objUser != null && objUser != undefined){
      this.UserId = objUser.userId;
    }
    var disableClockout = localStorage.getItem("ShowClockOutButton");
    if(disableClockout != null && disableClockout != undefined){
        this.IsDisable = JSON.parse(disableClockout);
      }
    var clientObj = localStorage.getItem("SelectedClient");
    if(clientObj != null && clientObj != undefined){
        this.SelectedClient = JSON.parse(clientObj);
    }
  }

  HHAClockIn(Type:number){
  
    this.model.userId = this.UserId;
    
    this.model.Type = Type;
    this.model.ClockInTime = new Date();
    if(Type ==1)
    {
      this._accountService.HHAClockIn(this.model).subscribe((response) => {
        
        if(response != null && response != undefined && response.result)
        {
            this.IsDisable = false;
            var that = this;
            this.IsShow = true;
            this.HHAMessage  = "HHA User clock in successfull."
            localStorage.setItem('ShowClockOutButton',JSON.stringify(this.IsDisable));
            setTimeout(function(){
              that.IsShow = false;
            },10000);   
        }
        else{
          this.HHAMessage = "HHA User does not exists.";
        }
      });
    }    
    else{
        this.IsShow = false;
        localStorage.removeItem('ShowClockOutButton');
        this.router.navigate(['/hhapatinet']);
    } 
  }


  GetClockinDetailsByUserId(userId:number)
  {
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

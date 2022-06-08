import { Component, OnInit } from '@angular/core';
import { ItemsList } from 'src/app/models/common';
import { MeetingInfo } from 'src/app/models/meeting/meeting-info';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { CommonService } from 'src/app/services/common.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { LoginModel, UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { UserType } from 'src/app/models/common';


@Component({
  selector: 'app-emp-schedule',
  templateUrl: './emp-schedule.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-schedule.component.scss']
})


export class EmpScheduleComponent implements OnInit {

  model = new MeetingInfo(0,[],-1,-1,'','','','');
  ClientList = Array<ItemsList>();
  EmplList = Array<ItemsList>();  
  timespan:string;
  _fromDate : Date=new Date();
  _toDate : Date=new Date();
  _meetingDate : Date=new Date();
  _startTime : Date=new Date();
  _endTime : Date=new Date();
  currentUser: UserModel;
  isClient:boolean=false;
  isRecurrence: boolean = false;
  IsLoad:boolean=false;
  constructor(
    private router:Router, 
    private route:ActivatedRoute,
    private comApi: CommonService,
    private empApi: EmployeeapiService,
     private clientapi : ClientApiService,
     private momApi:MeetingService,   
     private accountApi: AccountService,
      public datepipe: DatePipe,)
   {
    this.currentUser = this.accountApi.getCurrentUser();
     this.BindMaster();

     const sTime= this._startTime;
     sTime.setMinutes(sTime.getMinutes() + 15);
     this._startTime=sTime;
     const eTime= this._endTime;
     eTime.setMinutes(eTime.getMinutes() + 30);
     this._endTime=eTime;

     let tDate = new Date();
     tDate.setDate(tDate.getDate() + 1);
     this._toDate=tDate;


   }

  ngOnInit(): void {
    debugger;  
    this.route.params.subscribe(
      (params : Params) =>{
        this.isClient= UserType.Client===Number(params["typeId"])?true:false;
        if(this.isClient)
        {
          this.model.clientId = params["userId"];
        }
        else
        {
          this.model.empId = params["userId"];
        }
        this.model.meetingDate = params["fromDate"];
      });
  }

  BindMaster() {
    this.comApi.getEmpList().subscribe((response) => {
      if(response.result)
      {
        debugger;
        this.EmplList = response.data;
      }
    });
    this.comApi.getClientList().subscribe((response) => {
      if(response.result)
      {
        debugger;
        this.ClientList = response.data;
      }
    });    
  }



onChange(e:any):void {

  if (e.target.checked) {
    this._fromDate = new Date(this.model.meetingDate);
    let tDate = new Date(this._fromDate);
    tDate.setDate(tDate.getDate() + 1);
    this._toDate=tDate;
    this.isRecurrence=true;
  }
  else
  {

  }
  
  
}



  
OnScheduling()
{
  debugger;
  this.IsLoad=true;
  this.model.clientId=Number(this.model.clientId);
  this.model.empId=Number(this.model.empId);
  this.model.empList.push(Number(this.model.empId));
  
  this.model.meetingDate = this.datepipe.transform(new Date(this.model.meetingDate), 'dd-MM-yyyy')||"";
  this.model.startTime=this.datepipe.transform(this._startTime, 'h:mm a')||"";
  this.model.endTime=this.datepipe.transform(this._endTime, 'h:mm a')||"";
  this.model.userId = this.currentUser.userId;
  if(this.isRecurrence)
  {
    this.model.fromDate = this.datepipe.transform(this._fromDate, 'dd-MM-yyyy')||"";   
    this.model.toDate = this.datepipe.transform(this._toDate, 'dd-MM-yyyy')||"";
  }
  const reqObj: MeetingInfo = this.model;
  if(this.isRecurrence)
  {
    if(this.model.clientId>0&&this.model.empId)
    {
      this.momApi.addRecurringMeeting(reqObj).subscribe({   
        next: (response: any) => {  
          if (response.result) {
            if(this.isClient)
            {
              this.router.navigate(['/client/info/'+this.model.clientId+'/1']);
            }
            else
            {
              this.router.navigate(['/employee/info/'+this.model.empId+'/1']);
            }
          }
          else
          {
            this.IsLoad=false;
            alert("Some technical issue exist, Please contact to admin !");
          } 
         },
         error: (err) => { 
          this.IsLoad=false;
          alert("Some technical issue exist, Please contact to admin !");
         console.log(err);
      
        },   
        complete: () => { 
          this.IsLoad=false;
        }
    }); 
    }
    else
    {
      this.IsLoad=false;
      alert("please add both meeting attendees");
    }
  }
  else
  {
    if(this.model.clientId>0&&this.model.empId)
    {
      this.momApi.createMeeting(reqObj).subscribe({   
        next: (response: any) => {  
          if (response.result) {

            if(this.isClient)
            {
              this.router.navigate(['/client/info/'+this.model.clientId+'/1']);
            }
            else
            {
              this.router.navigate(['/employee/info/'+this.model.empId+'/1']);
            
            }

          }
          else
          {
            this.IsLoad=false;
            alert("Some technical issue exist, Please contact to admin !");
          } 
         },
         error: (err) => { 
          this.IsLoad=false;
          alert("Some technical issue exist, Please contact to admin !");
         console.log(err);
      
        },   
        complete: () => { 
          this.IsLoad=false;
        }
    }); 
    }
    else
    {
      this.IsLoad=false;
      alert("please add both meeting attendees");
    }
    
  }


    
  }
   
  changed(): void {
    this.getTimeDuration();
  }
 
  isValid?: boolean;
  getTimeDuration()
  {
    var diff =this._endTime.getTime()-this._startTime.getTime()
    //Math.round(new Date().getTime()/1000);
    var seconds = Math.round(diff/1000);
    var minutes =Math.round( diff/60000);
    var hours = Math.round(diff/3600000);
    var days = diff/86400000;

    
    var diff = this._endTime.valueOf() - this._startTime.valueOf(); // The unit is millisecond
    var hourDiff = diff / (60 * 60 * 1000); // Turn the duration into hour format




    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    // diff = 28800000 => hh = 8, mm = 0, ss = 0, msec = 0
    
    

    this.timespan= hh+":"+mm;
    
    
    //hours +":"+minutes +":"+seconds;
  }


}

import { Component, OnInit } from '@angular/core';
import { ItemsList } from 'src/app/models/common';
import { MeetingInfo } from 'src/app/models/meeting/meeting-info';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { CommonService } from 'src/app/services/common.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { DatePipe } from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  model = new MeetingInfo(0,[],-1,-1,'','','','');
  ClientList = Array<ItemsList>();
  EmplList = Array<ItemsList>();  
  timespan:string;

  _meetingDate : Date=new Date();
  _startTime : Date=new Date();
  _endTime : Date=new Date();

  constructor(
 
    private comApi: CommonService,private empApi: EmployeeapiService, private clientapi : ClientApiService,private momApi:MeetingService,    public datepipe: DatePipe,
    private toastr: ToastrManager)
   {
     this.BindMaster();
   }

  ngOnInit(): void {
  
 
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




  
OnScheduling()
  {
    debugger;    
    this.model.clientId=Number(this.model.clientId);
    this.model.empList.push(Number(this.model.empId));
    // this.model.meetingDate=this._meetingDate.toISOString().substring(0, 10);
    this.model.meetingDate = this.datepipe.transform(this._meetingDate, 'dd-MM-yyyy')||"";   
    this.model.startTime=this.datepipe.transform(this._startTime, 'h:mm a')||"";
    this.model.endTime=this.datepipe.transform(this._endTime, 'h:mm a')||"";
    //this.model.meetingDate=.toString();  
    //this.model.startTime=this._startTime.toLocaleTimeString();
    const reqObj: MeetingInfo = this.model;
    console.log('Search', reqObj);    
    this.momApi.createMeeting(reqObj).subscribe((response) => {    
      this.toastr.successToastr("Saved !", 'Succss!');
     //alert("saved");
    });
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

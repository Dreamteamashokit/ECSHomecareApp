import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from 'src/app/models/calendar-day';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { Empmeeting } from 'src/app/models/meeting/empmeeting';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { MeetingDetailComponent } from 'src/app/meeting/meeting-detail/meeting-detail.component';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',  
    './schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit {

  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  bsModalRef?: BsModalRef;
  constructor(
    
    private modalService: BsModalService,
    private router:Router, 
    private route:ActivatedRoute,private momApi:MeetingService,public datepipe: DatePipe) { }

  public displayMonth: string;
  private monthIndex: number = 0;
  private empId:number=1;
   meetingList: Empmeeting[];
  ngOnInit(): void {

    this.route.params
    .subscribe(
      (params : Params) =>{
        this.empId = params["empId"];
      }
    );

    this.momApi.getEmployeeMeeting(this.empId).subscribe((response) => {
      this.meetingList = response.data;
      console.log(response.data);  
      this.generateCalendarDays(this.monthIndex,this.empId);
    });
    
  }

  private generateCalendarDays(monthIndex: number,empId:number): void {
    // we reset our calendar
    this.calendar = [];
    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {

debugger;




let _cdate=new Date(dateToAdd);

let dateObj=this.datepipe.transform(dateToAdd,"yyyy-MM-dd");



let _meeting = this.meetingList.filter((x: Empmeeting) =>(this.datepipe.transform(x.meetingDate,"yyyy-MM-dd")===dateObj));

console.log(_meeting);


      this.calendar.push(new CalendarDay(_cdate,_meeting));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  BindMaster()
  { 
    this.momApi.getEmployeeMeeting(1).subscribe((response) => {
      this.meetingList = response.data;
      console.log(this.meetingList);
    });

  }


  private getStartDateForCalendar(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

   public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex,this.empId);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex,this.empId);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex,this.empId);
  }
  
  showMeeting(_meetingId :number) {
    debugger;
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component',
        meetingId:_meetingId
      }
    };
    debugger;
    this.bsModalRef = this.modalService.show(MeetingDetailComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  public addMeeting()
  {
    this.router.navigate(['/employee/schedule/'+this.empId]);
  }

  public addMeetingx(_fromDate:Date)
  {debugger;
    
     this.router.navigate(['/employee/schedule/'+this.empId+'/'+_fromDate.toDateString()]);
  }

}

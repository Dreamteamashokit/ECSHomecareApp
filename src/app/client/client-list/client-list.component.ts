import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';

import { ClientApiService } from 'src/app/services/client-api.service';
import { ClientMeeting ,ClientFilter,ClientResult} from 'src/app/models/meeting/client-meeting';
import { MeetingService } from 'src/app/services/meeting.service';
import { MeetingDetailComponent } from 'src/app/meeting/meeting-detail/meeting-detail.component';


import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType ,SelectList} from 'src/app/models/common';

import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';

import { noop, Observable, Observer, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from 'src/app/models/api-response';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './client-list.component.scss']
})


export class ClientListComponent implements OnInit {


monthList  : any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
clientMOMList : ClientMeeting[] = [];
currentList: ClientMeeting[];

currentYear : number;
currentMonthIndex : number;
currentDay : number;
currentDate : Date;
ptrcurrentDate : Date;
weekstartdate : Date;
weekenddate : Date;
currentweekarray : string[] = [];
weekList : Date[] = [];


currentAlpha:string="All";
IsLoad: boolean = false;
  currentUser:UserModel;
  statusData: ItemsList[] = [];
  managerList: ItemsList[];
  stateList: SelectList[];
  payerList: ItemsList[];
  objModel=new ClientFilter(0,"",0,0);
  p: number = 1;
  totalItemsCount : number = 0;
  searchValue = "";
  startdate : string;


  bsModalRef?: BsModalRef;
  constructor(
    private modalService: BsModalService,
    public datepipe: DatePipe,
    private router:Router, 
    private empapi: EmployeeapiService,
    private accountApi: AccountService,
    private comApi: CommonService,
    private clientapi : ClientApiService,
    private momApi:MeetingService,
    private http: HttpClient)
  {
    setTheme('bs3');
    this.currentDate = new Date();
    this.ptrcurrentDate = new Date();
    this.currentYear = new Date().getFullYear();
    this.currentMonthIndex = new Date().getMonth();
    this.currentDay = new Date().getDate();


    this.currentUser=this.accountApi.getCurrentUser();
    if(this.currentUser.userId>0)
    {
      this.BindClient(this.currentUser.userId);
    }
   
  }



  search?: string;
  suggestions$?: Observable<ClientResult[]>;
  errorMessage?: string;



    ngOnInit(): void {
      this.suggestions$ = new Observable((observer: Observer<string | undefined>) => {
        observer.next(this.search);
      }).pipe(
        switchMap((query: string) => {
          if (query) {
            // using github public api to get users by name
            return this.clientapi.searchClient(query).pipe(
              map((response: APIResponse<ClientResult[]>) => response && response.data || []),
              tap(() => noop, err => {
                // in case of http error
                this.errorMessage = err && err.message || 'Something goes wrong';
              })
            );
          }
   
          return of([]);
        })
      );
    }






 























  getFilterData(model: ClientFilter) {
debugger;
    //alert(model.status);
    this.objModel.status=Number(model.status);
    this.objModel.coordinator=Number(model.coordinator);
    this.objModel.payer=Number(model.payer);
    
    this.IsLoad = true;
    this.momApi.getClientMeetingListByFilter(this.objModel).subscribe((response) => {
      if(response.result)
      {
        debugger;
        this.clientMOMList= response.data;
        console.log( this.clientMOMList);
        this.IsLoad = false;
      }
      else
      {
        this.clientMOMList=[];
      this.IsLoad = false;
      }
      
    });

  }

  

  


  BindClient(userId:number)
  {
     this.IsLoad = true;  
     this.weekList = this.getWeekDays(this.currentDay, this.currentMonthIndex, this.currentYear);
     this.momApi.getClientMeetingList().subscribe((response) => {
       if(response.result)
       {
         debugger;
         this.clientMOMList=this.currentList= response.data;
         console.log( this.clientMOMList);
         console.log( this.currentweekarray);
         this.IsLoad = false;
       }
     });

    this.comApi.getMaster(MasterType.Status).subscribe((response) => {
      this.statusData = response.data;
    });
    this.comApi.getEmpList().subscribe((response) => {
      this.managerList = response.data;
    });


    this.comApi.getStateList('USA').subscribe((response) => {
      this.stateList = response.data;
    });

    this.comApi.getPayers().subscribe((response) => {
      this.payerList = response.data;
    });
  }
  

  AlphaFilter(alpha:any){
    this.currentAlpha=alpha;
    if (alpha == 'All') {
      this.clientMOMList = this.currentList;
    }
    else {
      var result = this.currentList.
       filter(o => o.firstName
      .substring(0,1).toLowerCase()===alpha.toLowerCase());

      this.clientMOMList = result;
    }

  }

  public getWeekDays(day : number, monthIndex : number, year : number): Date[] {
    var weeknumber = new Date().getDay();
    var dd = new Date(year, monthIndex, day);
    dd.setDate(dd.getDate() - weeknumber);
    const dateList: Date[] = [];
    this.currentweekarray = [];
    for (let i = 0; i <= 6; i++) {
      const newDate = new Date(dd.getTime());
      newDate.setDate(newDate.getDate() + i);
      let x : string = this.datepipe.transform(newDate,"yyyy-MM-dd") || "";
      this.currentweekarray.push(x);
      dateList.push(newDate);
      if(i == 0)
        this.startdate = this.datepipe.transform(newDate,"yyyy-MM-dd") || "";
    }
    return dateList;
  }

  OnNextWeek()
  {
    this.ptrcurrentDate.setDate(this.ptrcurrentDate.getDate() + 7);
    this.currentYear = this.ptrcurrentDate.getFullYear();
    this.currentMonthIndex = this.ptrcurrentDate.getMonth();
    this.currentDay = this.ptrcurrentDate.getDate();
    this.weekList = this.getWeekDays(this.currentDay, this.currentMonthIndex, this.currentYear);
  }

  OnPrevWeek()
  {
    
      this.ptrcurrentDate.setDate(this.ptrcurrentDate.getDate() - 7);
    this.currentYear = this.ptrcurrentDate.getFullYear();
    this.currentMonthIndex = this.ptrcurrentDate.getMonth();
    this.currentDay = this.ptrcurrentDate.getDate();
    this.weekList = this.getWeekDays(this.currentDay, this.currentMonthIndex, this.currentYear);
  }



  
  pageChanged(event : any){
    this.p = event;
  }

  public addMeeting(clientId:number)
  {
    this.router.navigate(['/client/schedule/'+clientId])
  }




  showMeeting() {
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(MeetingDetailComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }




}

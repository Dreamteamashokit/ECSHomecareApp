import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MeetingService } from 'src/app/services/meeting.service';
import { MeetingView, MeetingLog } from 'src/app/models/meeting/meeting-view';
import { UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { MeetingStatus, NotesModel } from 'src/app/models/meeting/meeting-status';
import { StatusEnum } from 'src/app/models/common';
import { MeetingInfo } from 'src/app/models/meeting/meeting-info';
@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './meeting-detail.component.scss']
})
export class MeetingDetailComponent implements OnInit {
  IsLoad: boolean = false;
  IsEdit: boolean = false;
  title?: string;
  closeBtnName?: string;
  momObj?: MeetingView;
  meetingId: number;
  user: UserModel;
  model = new MeetingStatus();
  IsCancel: boolean = false;
  notes: string;
  mNoteList: string[] = [];
  mlogList: MeetingLog[] = [];
  message?: string;
  currentUser: UserModel;

  modalRef?: BsModalRef;


  constructor(
    private router: Router,
    private accountSrv: AccountService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public datepipe: DatePipe,
    private momApi: MeetingService) {
    this.currentUser = this.accountSrv.getCurrentUser();
  }

  ngOnInit(): void {
    this.BindMeeting();
    this.getMeetingLog(this.meetingId);
  }

  BindMeeting() {
    debugger;
    this.momApi.getMeetingDetail(this.meetingId).subscribe((response) => {
      if (response.result) {
        this.momObj = response.data;
        this.mNoteList = response.data.notes;
        console.log(this.momObj);
        debugger;
        if (this.momObj.isStatus == StatusEnum.Cancelled || this.momObj.isStatus == StatusEnum.CancelledByClient) {
          this.IsCancel = false;
        }
        else {

          this.IsCancel = true;
        }
      }
    });
  }

  openModal(template: TemplateRef<any>, _status: number) {


    switch (_status) {
      case 2:
        this.title = "Cancel Appointment";
        break;
      case 3:
        this.title = "Cancel Appointment By Client";
        break;
    }




    this.model.meetingId = this.momObj?.meetingId != null ? this.momObj.meetingId : 0;
    this.model.isStatus = _status;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm', });
  }


  confirmNote: string;
  confirm(_status: number,): void {

    this.IsLoad = true;
    this.model.isStatus = _status;
    this.model.meetingId = this.momObj?.meetingId != null ? this.momObj.meetingId : 0;
    const reqObj: MeetingStatus = this.model;
    this.momApi.changeStatus(reqObj).subscribe((response) => {
      this.addConfirmNote(this.confirmNote, this.model.meetingId);
      this.modalRef?.hide();
      this.IsLoad = false;
      if (_status == StatusEnum.Cancelled || _status == StatusEnum.CancelledByClient) {
        this.IsCancel = false;
      }
      else {

        this.IsCancel = true;
      }
    });

  }

  decline(): void {
    this.modalRef?.hide();
  }

  addNote() {
    var obj = new NotesModel();
    obj.meetingPoint = this.message != null ? this.message : "";
    obj.meetingId = this.momObj?.meetingId != null ? this.momObj.meetingId : 0;
    obj.createdBy = this.currentUser.userId;
    this.momApi.addNote(obj).subscribe((response) => {
      this.momObj?.notes.push(obj.meetingPoint);
      this.message = "";
      this.getMeetingLog(this.meetingId);
    });
  }

  addConfirmNote(_note: string, _meetingId?: number) {
    var obj = new NotesModel();
    obj.meetingPoint = _note;
    obj.meetingId = _meetingId != null ? _meetingId : 0;
    obj.createdBy = this.currentUser.userId;
    this.momApi.addNote(obj).subscribe((response) => {
      this.momObj?.notes.push(obj.meetingPoint);
      this.confirmNote = "";
      this.getMeetingLog(this.meetingId);
    });
  }

  onChange(_status: number, _meetingId?: number) {
    this.IsLoad = true;
    this.model.isStatus = _status;
    this.model.meetingId = this.momObj?.meetingId != null ? this.momObj.meetingId : 0;
    const reqObj: MeetingStatus = this.model;
    this.momApi.changeStatus(reqObj).subscribe((response) => {
      this.IsLoad = false;
      if (_status == StatusEnum.Cancelled || _status == StatusEnum.CancelledByClient) {
        this.IsCancel = false;
      }
      else {
        this.IsCancel = true;
      }
    });
  }

  getMeetingLog(_meetingId?: number) {
    let mId = _meetingId == null ? 0 : _meetingId;
    this.momApi.getMeetingLog(mId).subscribe((response) => {
      this.mlogList = response.data;
    });
  }

  public formateDateTime(logTime: string) {
    var time = new Date(logTime);

    return this.datepipe.transform(time, "dd MMM YYYY h:mm a");
  }

  public profile(item: BsModalRef, userType: number, userId?: number,) {
    item.hide();
    if (userType == 8) {
      this.router.navigate(['/employee/info/' + userId + '/0']);
    }
    else {
      this.router.navigate(['/client/info/' + userId + '/0']);
    }

  }

  public scheduling(item: BsModalRef, userType: number, userId?: number,) {
    item.hide();
    if (userType == 8) {
      this.router.navigate(['/employee/info/' + userId + '/1']);
    }
    else {
      this.router.navigate(['/client/info/' + userId + '/1']);
    }
  }


  public delScheduling(item: BsModalRef,meetingId?: number) {
    this.IsLoad = true;
    this.model.isStatus = 0;
    this.model.meetingId = this.momObj?.meetingId != null ? this.momObj.meetingId : 0;
    const reqObj: MeetingStatus = this.model;
    this.momApi.changeStatus(reqObj).subscribe((response) => {
      this.IsLoad = false;
      item.hide();
      this.reloadCurrentPage()
    });  
  }

  



  reloadCurrentPage() {
    window.location.reload();
   }

   _message : string;
   _meetingDate : Date;
   _startTime : Date;
   _endTime : Date;
   _fromDate : Date;
   _toDate : Date;
   isRecurrence : boolean;
   editMeeting() {

    if(this.momObj != null)
    {
      this.IsEdit=true;
      let item=this.momObj;
      this._meetingDate=new Date(item.meetingDate);
      var _timeIn = item.meetingDate +' ' + item.startTime; 
      this._startTime=new Date(_timeIn);
      var _timeOut = item.meetingDate +' ' + item.endTime; 
      this._endTime=new Date(_timeOut);
    }

   }

   onRecurrence(e:any):void {
    if (e.target.checked) 
    {
      if(this.momObj != null)
      {
        let item=this.momObj;
        this._fromDate = new Date(item.meetingDate);
        let tDate = new Date(this._fromDate);
        tDate.setDate(tDate.getDate() + 1);
        this._toDate=tDate;
        this.isRecurrence=true;
      }
    }
    else
    {
      this.isRecurrence=false;
    }
  }


   reScheduling(panel: BsModalRef)
   {
     debugger;
    if(this.momObj != null)
    {    
      let item=this.momObj;
      this.IsLoad=true;
      let modelItem:MeetingInfo = new MeetingInfo(0,[],-1,-1,'','','','');
      if(this.isRecurrence)
      {
        modelItem.fromDate = this.datepipe.transform(this._fromDate, 'dd-MM-yyyy')||"";   
        modelItem.toDate = this.datepipe.transform(this._toDate, 'dd-MM-yyyy')||"";
      }
      modelItem.meetingDate = this.datepipe.transform(this._meetingDate, 'dd-MM-yyyy')||"";
      modelItem.startTime=this.datepipe.transform(this._startTime, 'h:mm a')||"";
      modelItem.endTime=this.datepipe.transform(this._endTime, 'h:mm a')||"";
      modelItem.userId = this.currentUser.userId;
      modelItem.clientId=item.client.id;
      modelItem.empId=item.employee.id;
      modelItem.meetingNote=this._message;

      this.momApi.updateMeeting(modelItem).subscribe({   
        next: (response: any) => {  
          if (response.result) 
          {
            this.IsLoad = false;
            panel.hide();
            this.reloadCurrentPage()
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
   
   }






   cxlScheduling()
   {
    this.IsEdit=false;
   }




}

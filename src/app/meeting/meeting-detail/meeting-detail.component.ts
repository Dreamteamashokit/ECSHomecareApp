import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StatusEnum,ItemsList } from 'src/app/models/common';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserModel } from 'src/app/models/account/login-model';
import { CommonService } from 'src/app/services/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MeetingService } from 'src/app/services/meeting.service';
import { AccountService } from 'src/app/services/account.service';
import { MeetingInfo } from 'src/app/models/meeting/meeting-info';
import { InvoiceService } from '../../services/invoice.service';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { MeetingView, MeetingLog } from 'src/app/models/meeting/meeting-view';
import { MeetingStatus, NotesModel } from 'src/app/models/meeting/meeting-status';
import { billingStatus } from '../../models/billing/billing-status';
import { payrollStatus } from '../../models/billing/Payroll-status';
import { MeetingRate } from '../../models/meeting/MeetingRate';

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
  IsBillingOption: boolean = false;
  IsPayrollOption: boolean = false;
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

  isClient:boolean;
  modalRef?: BsModalRef;
  userId:number;

  ClientList = Array<ItemsList>();
  BillingStatus = Array<billingStatus>();
  PayrollStatus = Array<payrollStatus>();
  MeetingRate = new MeetingRate();
  LatestThreeCompliance:any;


  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private momApi: MeetingService,
    private toastr: ToastrManager,
    private comApi: CommonService,
    public bsModalRef: BsModalRef,
    private accountSrv: AccountService,
    private empserv:EmployeeapiService,
    private modalService: BsModalService,
    private InvService: InvoiceService) {
    this.currentUser = this.accountSrv.getCurrentUser();
  }

  ngOnInit(): void {

    //alert(this.userId)

    this.bindClient();

    this.BindMeeting();
    this.getMeetingLog(this.meetingId);
    this.GetLatestThreeOverdueComplianceList(this.currentUser?.userId);
    this.GetBillingStatus();
    this.GetPayrollStatus();
    this.GetMeetingRateByMeetingId(this.meetingId);
    this.IsBillingOption = false;
    this.IsPayrollOption = false;
  }

  BindMeeting() {

    this.momApi.getMeetingDetail(this.meetingId).subscribe((response) => {
      if (response.result) {
        
        this.momObj = response.data;
        this.mNoteList = response.data.notes;

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
  cancelReason:string;
  confirm(_status: number,): void {

    this.IsLoad = true;
    this.model.isStatus = _status;
    this.model.meetingId = this.momObj?.meetingId != null ? this.momObj.meetingId : 0;
    this.model.meetingCanceledReason = this.cancelReason;
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
      // this.IsLoad = false;
      // item.hide();
      // this.reloadCurrentPage()
      this.IsLoad = false;
      item.hide();
      
      // if (this.isClient) {
      //   this.router.navigate(['/client/info/' + this.userId + '/1']);
      // }
      // else {
      //   this.router.navigate(['/employee/info/' +this.momObj?.employee?.id + '/1']);
      // }s

      let currentUrl = '';
      if (this.isClient) {
        currentUrl = '/client/info/' + this.userId  + '/1';
        this.reloadCurrentRoute(currentUrl);
      }
      else {
        this.router.navigate(['/employee/info/' +this.momObj?.employee?.id + '/1']);
        //currentUrl = '/employee/info/' + this.momObj?.employee?.id + '/1';

      }
      
    });  
  }

  reloadCurrentRoute(currentUrl: string) {

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
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
   _clientId:number;
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
      this._clientId = Number(item?.employee?.id);
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
    if(this.momObj != null)
    {    
      let item=this.momObj;
      this.IsLoad=true;
      let modelItem:MeetingInfo = new MeetingInfo(0,[],-1,-1,'','','','');
      if(this.isRecurrence)
      {
        modelItem.fromDate = this.datepipe.transform(this._fromDate, 'dd-MM-yyyy')||"";   
        modelItem.toDate = this.datepipe.transform(this._toDate, 'dd-MM-yyyy')||"";
        modelItem.meetingId=0;
      }
      else
      {
        modelItem.meetingId=item.meetingId;
      }
      modelItem.meetingDate = this.datepipe.transform(this._meetingDate, 'dd-MM-yyyy')||"";
      modelItem.startTime=this.datepipe.transform(this._startTime, 'h:mm a')||"";
      modelItem.endTime=this.datepipe.transform(this._endTime, 'h:mm a')||"";
      modelItem.userId = this.currentUser.userId;
      modelItem.clientId=item.client.id;
      modelItem.empId= Number(this._clientId);//item.employee.id;
      modelItem.meetingNote=this._message;
   

      this.momApi.updateMeeting(modelItem).subscribe({   
        next: (response: any) => {  
          if (response.result) 
          {
            this.IsLoad = false;
            if(this.MeetingRate == null || this.MeetingRate != undefined){
              panel.hide();
              this.reloadCurrentPage()
            }
          }
          else
          {
            this.IsLoad=false;
            this.toastr.infoToastr("Some technical issue exist, Please contact to admin !", 'Info!');
            //alert("Some technical issue exist, Please contact to admin !");
          } 
         },
         error: (err) => { 
          this.IsLoad=false;
          this.toastr.infoToastr("Some technical issue exist, Please contact to admin !", 'Info!');
          //alert("Some technical issue exist, Please contact to admin !");
         console.log(err);
      
        },   
        complete: () => { 
          this.IsLoad=false;
        }
    }); 
    }
      if(this.MeetingRate != null && this.MeetingRate != undefined && this.meetingId != null && this.meetingId != undefined){
        this.MeetingRate.meetingId =  this.meetingId;
        this.MeetingRate.sentPayrollDate = this.datepipe.transform(this.MeetingRate.sentPayrollDate, 'MM/dd/yyyy')||"";
        this.MeetingRate.billingUnits = Number(this.MeetingRate.billingUnits);
        this.MeetingRate.billingRate = Number(this.MeetingRate.billingRate);
        this.MeetingRate.billingTotal = Number(this.MeetingRate.billingTotal);
        this.MeetingRate.billingStatus = Number(this.MeetingRate.billingStatus);
        this.MeetingRate.billingTravelTime = Number(this.MeetingRate.billingTravelTime);

        this.MeetingRate.payrollUnitsPaid = Number(this.MeetingRate.payrollUnitsPaid);
        this.MeetingRate.payrollPayRate = Number(this.MeetingRate.payrollPayRate);
        this.MeetingRate.payrollPayTotal = Number(this.MeetingRate.payrollPayTotal);
        this.MeetingRate.payrollPayStatus = Number(this.MeetingRate.payrollPayStatus);
        this.MeetingRate.payrollMileage = Number(this.MeetingRate.payrollMileage);
        this.MeetingRate.payrollPublicTrans = Number(this.MeetingRate.payrollPublicTrans);
        this.MeetingRate.payrollMisc = Number(this.MeetingRate.payrollMisc);
        this.MeetingRate.payrollDoNotPay = this.MeetingRate.payrollDoNotPay;
        
        this.momApi.addupdateMeetingRate(this.MeetingRate).subscribe({   
          next: (response: any) => { 
            
            if (response.result) 
            {
              this.IsLoad = false;
              panel.hide();
              //this.reloadCurrentPage()
            }
            else
            {
              this.IsLoad=false;
              this.toastr.infoToastr("Some technical issue exist, Please contact to admin !", 'Info!');
            } 
           },
           error: (err) => { 
            this.IsLoad=false;
            this.toastr.infoToastr("Some technical issue exist, Please contact to admin !", 'Info!');
           console.log(err);
        
          },   
          complete: () => { 
            this.IsLoad=false;
          }
        });

      }
   }

   bindClient(){
    this.comApi.getClientList().subscribe((response) => {
      if(response.result)
      {
        this.ClientList = response.data;
      }
    });
   }

   GetLatestThreeOverdueComplianceList(userId:number){
    this.empserv.GetLatestThreeOverdueComplianceList(userId).subscribe((response)=>{
      if(response.result){
        
        this.LatestThreeCompliance = response.data;
      }
    })
   }


   cxlScheduling()
   {
    this.IsEdit=false;
   }

   GetBillingStatus(){
    this.InvService.GetBillingStatus().subscribe((response) => {
      if(response.result)
      {
        this.BillingStatus = response.data;
      }
    });
  }

  GetPayrollStatus(){
    this.InvService.GetPayrollStatus().subscribe((response) => {
      if(response.result)
      {
        this.PayrollStatus = response.data;
      }
    });
  }

  GetMeetingRateByMeetingId(meetingId:number){
    this.momApi.GetMeetingRateByMeetingId(meetingId).subscribe((response) => {
      if(response.result)
      {
        this.MeetingRate = response.data;
        this.MeetingRate.sentPayrollDate = this.datepipe.transform(this.MeetingRate.sentPayrollDate, 'MM/dd/yyyy')||"";
      }
    });
  }

  showBillingFields(){
    if(this.IsBillingOption){
      this.IsBillingOption = false;
    }
    else{
      this.IsBillingOption = true;
    }
  }

  showPayrollFields(){
    if(this.IsPayrollOption){
      this.IsPayrollOption = false;
    }
    else{
      this.IsPayrollOption = true;
    }
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}

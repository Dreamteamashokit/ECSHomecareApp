import { Component, OnInit,ViewChild,ViewChildren } from '@angular/core';
import { EmployeeapiService } from  '../services/employeeapi.service';
import { AccountService } from '../services/account.service';
import { DatePipe } from '@angular/common'
import { HHAClockout } from '../models/account/login-model';
import { SignaturePad } from 'angular2-signaturepad';
import { NgForm } from '@angular/forms';

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
  @ViewChild('clockoutForm') clockoutForm : NgForm;
  IsShowMessage:boolean = false;
  ClientsignatureImg: string ='';
  HHAUserSignatureImg:string = '';
  public secondSign: SignaturePad;

  @ViewChild("signaturePad") signaturePad!: SignaturePad;
  @ViewChild("HHAsignaturePad") HHAsignaturePad:SignaturePad;

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 900,
    'canvasHeight': 70
  };

  constructor(private _employeeService:EmployeeapiService,private _accountService:AccountService,
    public datepipe: DatePipe) { }

    ngAfterViewInit() {
      this.signaturePad.set('minWidth', 2); 
      this.signaturePad.clear(); 
      this.HHAsignaturePad.set('minWidth', 2)
      this.HHAsignaturePad.clear(); 
    }

    clearHHASignature(){
      this.HHAsignaturePad.clear();
    }

    clearSignature() {
      this.signaturePad.clear();
    }

    drawComplete() {
      console.log(this.signaturePad.toDataURL());
      console.log(this.HHAsignaturePad.toDataURL());
    }

    drawStart() {
      console.log('begin drawing');
    }

    savePad() {
      const base64Data = this.signaturePad.toDataURL();
      this.ClientsignatureImg = base64Data;
    }

    savePadHHA() {
      const base64Data = this.HHAsignaturePad.toDataURL();
      this.HHAUserSignatureImg = base64Data;
    }

  ngOnInit(): void {

    setInterval(() => {
      this.CurrentDate = new Date();
    }, 1000);

    var objUser = this._accountService.GetCurrentHHAUser();
    if(objUser != null && objUser != undefined)
    {
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

  HHAClockout(model:NgForm){
    
    this.GetClockinDetailsByUserId(this.UserId);
    
    setTimeout(() => {
      
      if((this.clockinDetails != null && this.clockinDetails != undefined) && 
      (this.clockinDetails.clockOutTime == null || this.clockinDetails.clockOutTime == undefined))
      {
        if(model.value.BedBath && model.value.SpongeBath && model.value.Footcare && model.value.Skincare){
      
          this.model = model.value;
          this.model.userId = this.UserId;
          this.model.Type = 2;
          this.model.ClockOutTime = new Date();
          this.model.ClockInTime = new Date();
          
          if(!this.signaturePad.isEmpty() && !this.HHAsignaturePad.isEmpty()){
            if(this.HHAsignaturePad.toDataURL() != null && this.HHAsignaturePad.toDataURL() != undefined){
              this.model.HHAUserSignature = this.HHAsignaturePad.toDataURL();
            }
      
            if(this.signaturePad.toDataURL() != null && this.signaturePad.toDataURL() != undefined){
              this.model.ClientSignature = this.signaturePad.toDataURL();
            }
            
            this._accountService.HHAClockout(this.model).subscribe((response) => {
              this.IsShowMessage = true;
              this.Message  = "HHA User clock out successfull."
              var that = this;
              setTimeout(function(){
                that.IsShowMessage = false;
              },10000);
    
              this.clockoutForm.resetForm();
              this.clearHHASignature();
              this.clearSignature();
            });
          }
          else{
            this.IsShowMessage = true;
            this.Message  = "HHA User/Client User Signature required."
              var that = this;
              setTimeout(function(){
                that.IsShowMessage = false;
              },10000);
          }
        }
        else{
            this.IsShowMessage = true;
            this.Message  = "Please checked all care plans."
            var that = this;
            setTimeout(function(){
              that.IsShowMessage = false;
            },10000);
        }
    }
    else{
      this.IsShowMessage = true;
            this.Message  = "HHA User already clock out."
            var that = this;
            setTimeout(function(){
              that.IsShowMessage = false;
            },5000);
    }

    }, 2000);
    
  }
}

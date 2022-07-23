import { Component, OnInit, ViewChild } from '@angular/core';
import { PayerModel } from 'src/app/models/account/payer-model';
import { PayerService } from 'src/app/services/payer.service';
import { SelectList } from 'src/app/models/common';
import { NgForm } from '@angular/forms';
import { RateModel } from 'src/app/billing/component/manage_payer_and_rate/model/rate.model';
import { UserModel } from 'src/app/models/account/login-model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
//import { CommonService } from 'src/app/services/common.service';
//import { AccountUserModel } from 'src/app/models/account/account-model';
//import { ToastrManager } from 'ng6-toastr-notifications';

declare var M: any;

@Component({
  selector: 'app-payers',
  templateUrl: './payers.component.html',
  styleUrls: ['./payers.component.scss'],
  providers:[PayerService]
})
export class PayersComponent implements OnInit {

  IsLoad: boolean = false;
    currentUser: UserModel;
  //IsChecked: boolean;
  model = new PayerModel();
  payerList : PayerModel[]=[];
  stateList: SelectList[] = [];
  //model1 = new AccountUserModel();
   
  @ViewChild('payerForm') public addRateFrm: NgForm;
  constructor(
    private payerSrv: PayerService,
    private invoiceService:InvoiceService,
        public toastr: ToastrManager,
        private router: Router
    //private comSrv: CommonService,
  ) { }

  ngOnInit(): void {
  this.resetForm();
  this.getPayerList();


  }
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.payerSrv.selectedPayer={
    payerId: 0,
    payerName: "",
    billToName:"",
    email: "",
    phone: "",
    fax: "",
    npi: "",
    fedId: "",
    etin: "",
    taxonomy: "",
    medicaidId: "",
    isActive: 0,
    createdOn: "",
    createdBy: 0,
    rateid: 0,
    payerid: 0,
    serviceCode: "",
    type: 0,
    billCode: "",
    revenueCode: "",
    taxRate: 0,
    validFrom: "",
    validTo: "",
    hourly: 0,
    livein: 0,
    visit: 0,
    unit: "",
    per:"",
    modifiers1: "",
    modifiers2: "",
    modifiers3: "",
    modifiers4: "",
    placeOfService: "",
    mutualGroup: false,
    notes: "",
    taxratepercentage:0,
    entityId:0,
  userId: 0
    }

  }

  getPayerList(){
    this.payerSrv.GetPayerList().subscribe((response: any) => {
  
      this.payerList = response.data;
   });
 }
  
 onClickSubmit(addRateForm:NgForm) {
  debugger;
  if(addRateForm.valid){
      this.model.rateid = 0;
      this.model.payerid = Number(this.model.payerid);
      if(!isNaN(this.model.taxRate)){
          this.model.taxRate = Number(this.model.taxRate); 
      }
      else{
          this.model.taxRate = 0; 
      } 
      if(this.model.unit != null && this.model.unit != undefined &&  this.model.hourly !=null && this.model.hourly != undefined)
      {
          this.model.unit = this.model.unit + " " + this.model.hourly;
      }
      else if(this.model.unit != null && this.model.unit != undefined &&  (this.model.hourly == null || this.model.hourly == undefined))
      {
          this.model.unit = this.model.unit;
      }
      else if(this.model.unit == null && this.model.unit == undefined &&  (this.model.hourly != null && this.model.hourly != undefined)){
          this.model.unit = this.model.hourly.toString();
      }
      
      this.model.hourly = 0;
      this.model.type = Number(this.model.type);
      this.model.livein = 0;
      this.model.visit = 0;
      this.model.createdBy = 0;
      const rateObj: RateModel = this.model;

      this.invoiceService.addUpdatePayerRate(this.model).subscribe(res => {
          debugger;
          if(res != null && res != undefined){

              this.toastr.successToastr('Rate Added', 'Success!');
              this.router.navigateByUrl('/billing');
          }
          else{
              this.toastr.successToastr('Rate Added', 'Something wrong while add rate!');
          }
      })
  }
}


 onSubmit(form: NgForm) {
  debugger;
  if((form.value.payerid == null) || (form.value.payerid == '')|| (form.value.payerid == undefined) ){
    this.payerSrv.AddPayer(form.value).subscribe((res)=>{
      this.onClickSubmit(form);
      this.resetForm(form);
      //this.refreshPayerList();
      M.toast({html:'Saved Successfully',classes:'rounded'});
      this.getPayerList();
    });
  }
  else{
    this.payerSrv.UpdatePayer(form.value).subscribe((res)=>{
      this.resetForm(form);
      //this.refreshPayerList();
      M.toast({html:'Updated Successfully',classes:'rounded'});
      this.getPayerList();
      
      
    });
  }

}

  


  EditPayer(_item: PayerModel) {
    this.model.payerId=_item.payerId;
    this.model.payerName=_item.payerName;
    this.model.billToName=_item.billToName;
    this.model.email=_item.email;
    this.model.phone=_item.phone;
    this.model.fax=_item.fax;
    this.model.npi=_item.npi;
    this.model.medicaidId=_item.medicaidId;
    this.model.etin=_item.etin;
    this.model.fedId=_item.fedId;
    this.model.taxonomy=_item.taxonomy;

  }

  deletepayer(PayerId: number) {
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.payerSrv.DelPayer(PayerId).subscribe((response) => {
        this.getPayerList();
      });
    }
  }



}

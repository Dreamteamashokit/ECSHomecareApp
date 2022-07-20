import { Component, OnInit } from '@angular/core';
import { PayerModel } from 'src/app/models/account/payer-model';
import { PayerService } from 'src/app/services/payer.service';
import { SelectList } from 'src/app/models/common';
import { NgForm } from '@angular/forms';
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
  //IsChecked: boolean;
  model = new PayerModel();
  payerList : PayerModel[]=[];
  stateList: SelectList[] = [];
  //model1 = new AccountUserModel();

  constructor(
    private payerSrv: PayerService
    //private comSrv: CommonService,
  ) { 
    //this.BindMaster();
    this.getPayerList();
    //this. model1.homeAddress.state="";

  }

  ngOnInit(): void {
  this.resetForm();
  //this.refreshPayerList();
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
    createdBy: 0
    }

  }

  getPayerList(){
    this.payerSrv.GetPayerList().subscribe((response: any) => {
  
      this.payerList = response.data;
   });
 }
  // BindMaster()
  // {
  //   this.comSrv.getStateList('USA').subscribe((response) => {
  //     this.stateList = response.data;
  //   });
  // }

 onSubmit(form: NgForm) {
  if((form.value.payerid == null) || (form.value.payerid == '')|| (form.value.payerid == undefined) ){
    this.payerSrv.AddPayer(form.value).subscribe((res)=>{
      this.resetForm(form);
      //this.refreshPayerList();
      M.toast({html:'Saved Successfully',classes:'rounded'});
    });
  }
  else{
    this.payerSrv.UpdatePayer(form.value).subscribe((res)=>{
      this.resetForm(form);
      //this.refreshPayerList();
      M.toast({html:'Updated Successfully',classes:'rounded'});
      
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
    debugger;
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.payerSrv.DelPayer(PayerId).subscribe((response) => {
        this.getPayerList();
      });
    }
  }



}

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
  payerList : PayerModel[];
  stateList: SelectList[] = [];
  //model1 = new AccountUserModel();

  constructor(
    private payerSrv: PayerService
    //private comSrv: CommonService,
  ) { 
    //this.BindMaster();
    //this.getPayerList();
    //this. model1.homeAddress.state="";

  }

  ngOnInit(): void {
  this.resetForm();
  //this.refreshPayerList();

  }
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.payerSrv.selectedPayer={
    PayerId: 0,
    PayerName: "",
    BillToName:"",
    Email: "",
    Phone: "",
    Fax: "",
    NPI: "",
    FedId: "",
    ETIN: "",
    Taxonomy: "",
    MedicaidId: "",
    IsActive: 0,
    CreatedOn: "",
    CreatedBy: 0
    }

  }
  // BindMaster()
  // {
  //   this.comSrv.getStateList('USA').subscribe((response) => {
  //     this.stateList = response.data;
  //   });
  // }

 onSubmit(form: NgForm) {
  debugger;
  if((form.value.PayerId == null) || (form.value.PayerId == '')|| (form.value.PayerId == undefined) ){
    this.payerSrv.postPayer(form.value).subscribe((res)=>{
      this.resetForm(form);
      //this.refreshPayerList();
      M.toast({html:'Saved Successfully',classes:'rounded'});
    });
  }
  else{
    this.payerSrv.putPayer(form.value).subscribe((res)=>{
      this.resetForm(form);
      //this.refreshPayerList();
      M.toast({html:'Updated Successfully',classes:'rounded'});
    });
  }

}

  // getPayerList(){
  //   this.payerSrv.getPayerList().subscribe((response: any) => {
  //     this.payerList = response.data;
  //   });
  // }

  // getPayerListById(PayerId : number) {
  //    this.payerSrv.getPayerListById(PayerId).subscribe((response) => {
  //      this.payerList = response.data;
  //      console.log(response);
  //      this.IsLoad = false;
  //    });
  // }

  editItem(_item: PayerModel) {
    this.model.PayerId=_item.PayerId;
    this.model.PayerName=_item.PayerName;
    this.model.BillToName=_item.BillToName;
    this.model.Email=_item.Email;
    this.model.Phone=_item.Phone;
    this.model.Fax=_item.Fax;
    this.model.NPI=_item.NPI;
  }

  deletepayer(PayerId: number) {
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.payerSrv.deletepayer(PayerId).subscribe(() => {
        //this.getPayerList();
      });
    }
  }



}

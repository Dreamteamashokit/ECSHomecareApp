import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PayerService } from 'src/app/services/payer.service';
import { SelectList } from 'src/app/models/common';
import { Payer } from 'src/app/billing/component/manage_payer_and_rate/model/payer.model';
import { RateModel } from 'src/app/billing/component/manage_payer_and_rate/model/rate.model';
import { UserModel } from 'src/app/models/account/login-model';
import { InvoiceService } from 'src/app/services/invoice.service';



@Component({
  selector: 'app-add-payer',
  templateUrl: './add-payer.component.html',
  styleUrls: ['./add-payer.component.scss']
})
export class AddPayerComponent implements OnInit {
  IsLoad: boolean = false;
  currentUser: UserModel;

model = new Payer();
payerList : Payer[]=[];


 
@ViewChild('payerForm') public addRateFrm: NgForm;
  constructor(   private payerSrv: PayerService,

        public toastr: ToastrManager,
        private router: Router) { }

  ngOnInit(): void {

    this.getPayerList()
  }

  getPayerList(){
    this.payerSrv.getPayerList().subscribe((response: any) => {
  
      this.payerList = response.data;
   });
 }

 onSubmit(form: NgForm) {
  
  if((form.value.payerid == null) || (form.value.payerid == '')|| (form.value.payerid == undefined) ){
    this.payerSrv.addPayer(form.value).subscribe((res)=>{

      this.getPayerList();
    });
  }
  else{
    this.payerSrv.updatePayer(form.value).subscribe((res)=>{

      this.getPayerList();
      
      
    });
  }
  this.resetForm(form);
}

resetForm(form?: NgForm){
  if(form){
    form.reset();
  }


}

 editPayer(_item: Payer) {
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

deletePayer(PayerId: number) {
  let isOk = confirm("Are you sure to delete?");
  if (isOk) {
    this.payerSrv.delPayer(PayerId).subscribe((response) => {
      this.getPayerList();
    });
  }
}



navigate(path: string) {
  this.router.navigate([path])
}

addRate(payerId:number) {
 let path= 'billing/add-payer/'+payerId;
 
  this.router.navigate([path])
}





}

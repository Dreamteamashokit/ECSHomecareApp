import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PayerModel } from 'src/app/models/account/payer-model';
import { UserModel } from 'src/app/models/account/login-model';
import { PayerService } from 'src/app/services/payer.service';

@Component({
  selector: 'app-payers',
  templateUrl: './payers.component.html',
  styleUrls: ['./payers.component.scss']
})
export class PayersComponent implements OnInit {
  IsLoad: boolean = false;
  currentUser:UserModel;
  IsChecked: boolean;
  model = new PayerModel();
  payerList : PayerModel[];

  constructor(
    private payerSrv: PayerService,
    private toastr: ToastrManager
  ) { 
    this.currentUser = this.payerSrv.getCurrentUser();
  }

  ngOnInit(): void {
    this.getPayerList(this.model.PayerId);
  }

 saveChanges() {
   if(this.IsChecked)
     {
     this.model.PayerId=3;
       this.IsLoad = true;
       this.model.isActive=1; 
       this.model.CreatedBy=this.currentUser.userId;

       const reqObj: PayerModel = this.model;
       console.log('Search', reqObj);
       this.payerSrv.addPayer(reqObj).subscribe((response) => {

         this.getPayerList(reqObj.PayerId);
     
       });
     }
     else
     {
       this.toastr.infoToastr("Select Checkbox!", 'Info!');
     }
 
  }

  getPayerList(PayerId : number) {
     this.payerSrv.getPayerList(PayerId).subscribe((response) => {
       this.payerList = response.data;
       console.log(response);
       this.IsLoad = false;
     });
  }

  editItem(_item: PayerModel) {
    this.model.PayerId = _item.PayerId;
    this.model.PayerName = _item.PayerName;
    this.model.Address = _item.Address;
    this.model.isActive = _item.isActive;

  }

  delItem(categoryId: number) {
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.payerSrv.delpayerId(categoryId).subscribe((response) => {
        this.getPayerList(this.model.PayerId);
      });
    }
  }



}

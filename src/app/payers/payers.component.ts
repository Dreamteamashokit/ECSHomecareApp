import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Payer, UserModel } from '../models/account/login-model';
import { SelectList } from '../models/common';
import { AccountService } from '../services/account.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-payers',
  templateUrl: './payers.component.html',
  styleUrls: ['./payers.component.scss']
})
export class PayersComponent implements OnInit {
  IsLoad: boolean = false;
  currentUser:UserModel;
  IsChecked: boolean;
  model = new Payer();
  payerList = Array<Payer>();

  constructor(
    private router:Router, 
    private comSrv: CommonService,
    private accntSrv: AccountService,
    private toastr: ToastrManager
  ) { }

  ngOnInit(): void {
  }

  saveChanges() {
    if(this.IsChecked)
    {
    this.model.PayerId=3;
      this.IsLoad = true;
      this.model.isActive=1; 
      this.model.CreatedBy=this.currentUser.userId;

      const reqObj: Payer = this.model;
      console.log('Search', reqObj);
      this.accntSrv.addPayer(reqObj).subscribe((response) => {

        this.getPayerList(reqObj.PayerId);
     
      });
    }
    else
    {
      this.toastr.infoToastr("Select Checkbox!", 'Info!');
      //alert("Select Checkbox");
    }
 
  }

  getPayerList(PayerId : number) {
    this.accntSrv.getPayerList(PayerId).subscribe((response) => {
      this.payerList = response.data;
      console.log(response);
      this.IsLoad = false;
    });
  }


}

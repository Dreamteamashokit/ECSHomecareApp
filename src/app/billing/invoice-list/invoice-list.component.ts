import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { BillingService } from 'src/app/services/billing.service';
import { UserModel } from 'src/app/models/account/login-model';
import { ItemsList, UserType, BillingStatus } from 'src/app/models/common';
import { SearchSchedule, ClientSchedule, ScheduleBillingModel ,UpdateBillingSchedule,InvoiceModel} from 'src/app/models/billing/schedule-billing-model';

import { ScheduleInvoiceModel,InvoiceView} from 'src/app/models/billing/invoice-model';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css', './invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  IsLoad: boolean = false;
  currentUser: UserModel;
  clientList: ItemsList[];
  empList: ItemsList[];
  payerList: ItemsList[];
  billingStatusList: any;
  currentDate: Date;
  searchModel = new SearchSchedule();

  InvoiceList: InvoiceView[];

  constructor(private router: Router,
    private accountSrv: AccountService,
    private comSrv: CommonService,
    private billSrv: BillingService) 
    { 
      this.currentDate = new Date();
      this.searchModel.payerId = 0;
      this.searchModel.empId = 0;
      this.searchModel.clientId = 0;
      this.searchModel.fromDate = this.currentDate;
      this.searchModel.toDate = this.currentDate;
      this.comSrv.getUsers(UserType.Client).subscribe((response) => {
        this.clientList = response.data;
      });
      this.comSrv.getUsers(UserType.Employee).subscribe((response) => {
        this.empList = response.data;
      });
      this.comSrv.getPayers().subscribe((response) => {
        this.payerList = response.data;
      });
      this.billingStatusList = [{ id: 1, name: 'Confirmed' }, { id: 2, name: 'Hold' }, { id: 5, name: 'Nonbillable' }];
      this.currentUser = this.accountSrv.getCurrentUser();
    }

  ngOnInit(): void {

this.BindScheduleInvoice();

  }





BindScheduleInvoice() {
    this.IsLoad = true;
    this.billSrv.getScheduleInvoice().subscribe({
      next: (response) => {
        if (response.result) {
          this.InvoiceList = response.data;
        }
        else {
          this.InvoiceList = [];
        }
      },
      error: (err) => {
        console.log(err);
        this.InvoiceList = [];
      },
      complete: () => {
        this.IsLoad = false;
      }
    });

  }




  getFilterData(item: SearchSchedule) {
    item.payerId = Number(item.payerId);
    item.empId = Number(item.empId);
    item.clientId = Number(item.clientId);
    let resultText = '';
    this.IsLoad = true;
    this.billSrv.getScheduleBilling(item).subscribe({
      next: (response) => {
        if (response.result) {
         // this.scheduleList = response.data;
        }
        else {
       //   this.scheduleList = [];
        }
      },
      error: (err) => {
        console.log(err);
       // this.scheduleList = [];
      },
      complete: () => {
       // this.IsLoad = false;
      }
    });
  }

}




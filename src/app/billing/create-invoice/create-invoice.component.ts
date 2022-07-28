import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { BillingService } from 'src/app/services/billing.service';
import { UserModel } from 'src/app/models/account/login-model';
import { ItemsList, UserType, BillingStatus } from 'src/app/models/common';
import { SearchSchedule, ClientSchedule, ScheduleBillingModel ,UpdateBillingSchedule,InvoiceModel} from 'src/app/models/billing/schedule-billing-model';

import { CustomFilterPipe } from 'src/app//pipe/custom-filter.pipe';


// const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
// arr.reduce((groups, item) => {
//   (groups[key(item)] ||= []).push(item);
//   return groups;
// }, {} as Record<K, T[]>);


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css', './create-invoice.component.scss'


  ]
})







export class CreateInvoiceComponent implements OnInit {
  IsLoad: boolean = false;
  currentUser: UserModel;
  clientList: ItemsList[];
  empList: ItemsList[];
  payerList: ItemsList[];
  scheduleList: ClientSchedule[];
  billingStatusList: any;
  currentDate: Date;

  searchModel = new SearchSchedule();

  constructor(
    private router: Router,
    private accountSrv: AccountService,
    private comSrv: CommonService,
    private billSrv: BillingService

  ) {
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
    this.IsLoad = true;
    this.BindAllSchedule();
  }

  BindAllSchedule() {
    this.IsLoad = true;
    this.billSrv.getAllScheduleBilling().subscribe({
      next: (response) => {
        if (response.result) {
          this.scheduleList = response.data;
        }
        else {
          this.scheduleList = [];
        }
      },
      error: (err) => {
        console.log(err);
        this.scheduleList = [];
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
          this.scheduleList = response.data;
        }
        else {
          this.scheduleList = [];
        }
      },
      error: (err) => {
        console.log(err);
        this.scheduleList = [];
      },
      complete: () => {
        this.IsLoad = false;
      }
    });
  }

  updateAll(event: any, billingStatus: number, schedules: ScheduleBillingModel[]) {
    if (event.target.value != '') {
     if(schedules.filter(x => (x.isChecked == true)).length>0)
     {
      let req  = new UpdateBillingSchedule();
      req.billingStatus=Number(event.target.value);
      req.scheduleList=schedules.filter(x => (x.isChecked == true)).map(y=>y.scheduleRateId);
      this.IsLoad = true;
      this.billSrv.updateSchedule(req).subscribe({
        next: (response) => {
          if (response.result) {
            event.target.value = '';
          }         
        },
        error: (err) => {
          console.log(err);       
        },
        complete: () => {
          this.IsLoad = false;
        }
      });
     }
     else
     {
      event.target.value = '';
      alert("plz select row");
     }
    }
  }



  selectAll(event: any, billingStatus: number, schedules: ScheduleBillingModel[]) {
    if (event.target.checked) {
      schedules.filter(x => x.billingStatus = billingStatus).forEach(x => x.isChecked = true);
    }
    else {
      schedules.filter(x => x.billingStatus = billingStatus).forEach(x => x.isChecked = false);
    }
  }


  getEnumToList(eumType: any) {
    return Object.entries(eumType).filter(e => !isNaN(e[0] as any)).map(e => ({ name: e[1], id: e[0] }));
  }

  createInvoice(schedules: ScheduleBillingModel[])
  {
    if(schedules.filter(x => (x.isChecked == true)).length>0)
    {
     let req  = new InvoiceModel();
     req.invoiceNo='Test';
     req.createdBy = this.currentUser.userId;
    //  invoiceNo: string;
    //  payerId: number;
    //  payerName: string;
    //  amounts: number;
     req.scheduleList=schedules.filter(x => (x.isChecked == true));
     this.IsLoad = true;
     this.billSrv.createInvoice(req).subscribe({
       next: (response) => {
         if (response.result) {
          alert("Invoice generated");
         }         
       },
       error: (err) => {
         console.log(err);       
       },
       complete: () => {
         this.IsLoad = false;
       }
     });
    }
    else
    {
     alert("plz select row");
    }
  }

}

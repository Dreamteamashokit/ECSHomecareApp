import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { BillingService } from 'src/app/services/billing.service';
import { UserModel } from 'src/app/models/account/login-model';
import { ItemsList, UserType } from 'src/app/models/common';
import { SearchSchedule, ClientSchedule } from 'src/app/models/billing/schedule-billing-model';

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








    // console.log(this.statusData);
    // model.status=Number(model.status);
    // model.coordinator=Number(model.coordinator);
    // model.payer=Number(model.payer); 
    // model.empType=Number(model.empType);
    // let resultText= '';
    // if(model.status!=0)
    // {    
    //   const result = this.statusData.find(x => x.itemId === model.status);
    //  resultText+= 'Status :'+ result ?.itemName + ", ";    
    // }
    // if(model.coordinator!=0)
    // {  
    //   const result = this.managerList.find(x => x.itemId === model.coordinator);
    //   resultText+= 'Coordinator :'+ result ?.itemName + ", ";
    // }
    // if(model.payer!=0)
    // {     
    //   const result = this.payerList.find(x => x.itemId === model.payer);
    //   resultText+= 'Payer :'+ result ?.itemName + ", ";
    // }
    // if(model.state!="")
    // {
    //   const result = this.stateList.find(x => x.itemCode === model.state);
    //   resultText+= 'State :'+ result ?.itemName + ", ";  
    // }    
    // this.resultText=resultText; 
    // this.momApi.getClientMeetingListByFilter(this.objModel).subscribe({ 
    //   next: (response) => {
    //     if(response.result)
    //     {       
    //       this.clientMOMList= response.data;
    //       this.totalItemsCount=response.data.length;         
    //     }
    //     else
    //     {
    //       this.clientMOMList=[];
    //       this.totalItemsCount=0;       
    //     }        
    //   }, 
    //   error: (err) => { 
    //     console.log(err);   
    //     this.clientMOMList=[];
    //     this.totalItemsCount=0;  
    //   }, 
    //   complete: () => { this.IsLoad = false;
    //   }
    // });    

  }















}

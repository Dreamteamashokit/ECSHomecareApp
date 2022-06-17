import { ClientBilling, ServiceCode,RateViewModel } from './../../models/client/client-billling-model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemsList } from 'src/app/models/common';
import { CommonService } from 'src/app/services/common.service';
import { NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';
import { parseDate } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-client-billing',
  templateUrl: './client-billing.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css','./client-billing.component.scss']
})
export class ClientBillingComponent implements OnInit {
  modalRef?: BsModalRef;
  model= new ClientBilling();
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;
  byDaysOfWeekToggle: boolean = false;
  payerItemList = Array<ItemsList>();
  currentClinetBill:ClientBilling = new ClientBilling();
  Quantity:number;
  activeClinetBills = Array<ClientBilling>();
  expiredClientBills = Array<ClientBilling>();
  rateList:any;
  serviceCode = Array<ServiceCode>();
  selectedPayerId : number;



  @ViewChild('frmclientbill') public addBillFrm: NgForm;
  constructor(
    private modalService: BsModalService,
    private commonService: CommonService,
    private invoiceService:InvoiceService,
    public toastr: ToastrManager,
    private datepipe: DatePipe,
    
    ) { 

    }

 
  ngOnInit(): void {
    this.initClientBill()
    this.getPayerList();
    this.getActiveBill();
    this.getExpiredBill();

  }

  openModal(template: TemplateRef<any>) {
    this.isUpdateVisible = false;
    this.isAddVisible = true;
    this.modalRef = this.modalService.show(template);
    
    var el = document.querySelector('.modal-dialog');
    if(el != null && el != undefined){
      el.className += ' modal-dialog-lg';
    }
    
  }

  decline(): void {
    this.modalRef?.hide();
    this.model = new ClientBilling();
  }


  toggleForm(): void {
    this.byDaysOfWeekToggle = !this.byDaysOfWeekToggle;
  }


  getPayerList() {
    this.commonService.getPayers().subscribe(res => {
        this.payerItemList = res.data;
    });
  }


  getPayerNmaeFromId(id:number){
    let payerName = this.payerItemList.find(x => x.itemId == id);
    return payerName?.itemName
  }


  getActiveBill(){
    this.activeClinetBills = Array<ClientBilling>();

    this.invoiceService.GetActiveBillAndExpiredBill(true).subscribe(res => {
      
      if(res != null && res != undefined && res?.result){
        res?.data.forEach(item => {
            this.activeClinetBills.push(item);
        })
      }
    });
  }


  getExpiredBill(){
    this.expiredClientBills = Array<ClientBilling>();

    this.invoiceService.GetActiveBillAndExpiredBill(false).subscribe(res => {
      if(res != null && res != undefined && res?.result){
        res?.data.forEach(item => {
          this.expiredClientBills.push(item);
        }) 
      }
    });
  }


  onClickSubmit(f: NgForm){
    
    if(f.valid){
      if(this.model.billingId != null && this.model.billingId != undefined && !isNaN(this.model.billingId)){
        this.model.billingId = Number(this.model.billingId);
      }
      else{
        this.model.billingId = 0;
      }
      
      if(this.model.billingId > 0){
        this.onClickUpdate();
      }
      else{
        this.model.payerId = Number(this.model.payerId);
        this.model.contractClientId = this.model.contractClientId;
        this.model.serviceCode = Number(this.model.serviceCode);
        debugger;
        let totrasformDate = this.datepipe.transform(this.model.toDate, 'MM-dd-yyyy')||""
        let fromtrasformDate = this.datepipe.transform(this.model.fromDate, 'MM-dd-yyyy')||""
        this.model.toDate = totrasformDate;
        this.model.fromDate = fromtrasformDate;

        if(!this.byDaysOfWeekToggle){
          
          if(this.model.brServiceCode_SAT != null && this.model.brServiceCode_SAT != undefined && !isNaN(this.model.brServiceCode_SAT)){
            this.model.brServiceCode_SAT = Number(this.model.brServiceCode_SAT);
          }else{this.model.brServiceCode_SAT = 0;}
          
          if(this.model.brServiceCode_SUN != null && this.model.brServiceCode_SUN != undefined && !isNaN(this.model.brServiceCode_SUN)){
            this.model.brServiceCode_SUN = Number(this.model.brServiceCode_SUN);
          }else{this.model.brServiceCode_SUN = 0;}

          if(this.model.brServiceCode_MON != null && this.model.brServiceCode_MON != undefined && !isNaN(this.model.brServiceCode_MON)){
            this.model.brServiceCode_MON = Number(this.model.brServiceCode_MON);
          }else{this.model.brServiceCode_MON = 0;}

          if(this.model.brServiceCode_TUE != null && this.model.brServiceCode_TUE != undefined && !isNaN(this.model.brServiceCode_TUE)){
            this.model.brServiceCode_TUE = Number(this.model.brServiceCode_TUE);
          }else{this.model.brServiceCode_TUE = 0;}

          if(this.model.brServiceCode_WED != null && this.model.brServiceCode_WED != undefined && !isNaN(this.model.brServiceCode_WED)){
            this.model.brServiceCode_WED = Number(this.model.brServiceCode_WED);
          }else{this.model.brServiceCode_WED = 0;}

          if(this.model.brServiceCode_THU != null && this.model.brServiceCode_THU != undefined && !isNaN(this.model.brServiceCode_THU)){
            this.model.brServiceCode_THU = Number(this.model.brServiceCode_THU);
          }else{this.model.brServiceCode_THU = 0;}

          if(this.model.brServiceCode_FRI != null && this.model.brServiceCode_FRI != undefined && !isNaN(this.model.brServiceCode_FRI)){
            this.model.brServiceCode_FRI = Number(this.model.brServiceCode_FRI);
          }else{this.model.brServiceCode_FRI = 0;}
      
          if(this.model.quantity_SAT != null && this.model.quantity_SAT != undefined && !isNaN(this.model.quantity_SAT)){
            this.model.quantity_SAT = Number(this.model.quantity_SAT);
          }else{this.model.quantity_SAT = 0;}

          if(this.model.quantity_SUN != null && this.model.quantity_SUN != undefined && !isNaN(this.model.quantity_SUN)){
            this.model.quantity_SUN = Number(this.model.quantity_SUN);
          }else{this.model.quantity_SUN = 0;}

          if(this.model.quantity_MON != null && this.model.quantity_MON != undefined && !isNaN(this.model.quantity_MON)){
            this.model.quantity_MON = Number(this.model.quantity_MON);
          }else{this.model.quantity_MON = 0;}

          if(this.model.quantity_TUE != null && this.model.quantity_TUE != undefined && !isNaN(this.model.quantity_TUE)){
            this.model.quantity_TUE = Number(this.model.quantity_TUE);
          }else{this.model.quantity_TUE = 0;}

          if(this.model.quantity_WED != null && this.model.quantity_WED != undefined && !isNaN(this.model.quantity_WED)){
            this.model.quantity_WED = Number(this.model.quantity_WED);
          }else{this.model.quantity_WED = 0;}

          if(this.model.quantity_THU != null && this.model.quantity_THU != undefined && !isNaN(this.model.quantity_THU)){
            this.model.quantity_THU = Number(this.model.quantity_THU);
          }else{this.model.quantity_THU = 0;}

          if(this.model.quantity_FRI != null && this.model.quantity_FRI != undefined && !isNaN(this.model.quantity_FRI)){
            this.model.quantity_FRI = Number(this.model.quantity_FRI);
          }else{this.model.quantity_FRI = 0;}

          this.model.periodEpisode_Notes = "";
          this.model.serviceCode = 0;
          this.model.hoursAuthorizedPerWeek = "";
          this.model.hoursAuthorizedPerMonth= "";
          this.model.hoursAuthorizedEntirePeriod ="";
          this.model.occurencesAuthorizedPerWeek = "";
          this.model.occurencesAuthorizedPerMonth ="";
          this.model.occurencesAuthorizedEntirePeriod ="";
    
        }
        else{
          if(this.model.brServiceCode_SAT != null && this.model.brServiceCode_SAT != undefined && !isNaN(this.model.brServiceCode_SAT)){
            this.model.brServiceCode_SAT = Number(this.model.brServiceCode_SAT);
          }else{this.model.brServiceCode_SAT = 0;}
          
          if(this.model.brServiceCode_SUN != null && this.model.brServiceCode_SUN != undefined && !isNaN(this.model.brServiceCode_SUN)){
            this.model.brServiceCode_SUN = Number(this.model.brServiceCode_SUN);
          }else{this.model.brServiceCode_SUN = 0;}

          if(this.model.brServiceCode_MON != null && this.model.brServiceCode_MON != undefined && !isNaN(this.model.brServiceCode_MON)){
            this.model.brServiceCode_MON = Number(this.model.brServiceCode_MON);
          }else{this.model.brServiceCode_MON = 0;}

          if(this.model.brServiceCode_TUE != null && this.model.brServiceCode_TUE != undefined && !isNaN(this.model.brServiceCode_TUE)){
            this.model.brServiceCode_TUE = Number(this.model.brServiceCode_TUE);
          }else{this.model.brServiceCode_TUE = 0;}

          if(this.model.brServiceCode_WED != null && this.model.brServiceCode_WED != undefined && !isNaN(this.model.brServiceCode_WED)){
            this.model.brServiceCode_WED = Number(this.model.brServiceCode_WED);
          }else{this.model.brServiceCode_WED = 0;}

          if(this.model.brServiceCode_THU != null && this.model.brServiceCode_THU != undefined && !isNaN(this.model.brServiceCode_THU)){
            this.model.brServiceCode_THU = Number(this.model.brServiceCode_THU);
          }else{this.model.brServiceCode_THU = 0;}

          if(this.model.brServiceCode_FRI != null && this.model.brServiceCode_FRI != undefined && !isNaN(this.model.brServiceCode_FRI)){
            this.model.brServiceCode_FRI = Number(this.model.brServiceCode_FRI);
          }else{this.model.brServiceCode_FRI = 0;}
      
          if(this.model.quantity_SAT != null && this.model.quantity_SAT != undefined && !isNaN(this.model.quantity_SAT)){
            this.model.quantity_SAT = Number(this.model.quantity_SAT);
          }else{this.model.quantity_SAT = 0;}

          if(this.model.quantity_SUN != null && this.model.quantity_SUN != undefined && !isNaN(this.model.quantity_SUN)){
            this.model.quantity_SUN = Number(this.model.quantity_SUN);
          }else{this.model.quantity_SUN = 0;}

          if(this.model.quantity_MON != null && this.model.quantity_MON != undefined && !isNaN(this.model.quantity_MON)){
            this.model.quantity_MON = Number(this.model.quantity_MON);
          }else{this.model.quantity_MON = 0;}

          if(this.model.quantity_TUE != null && this.model.quantity_TUE != undefined && !isNaN(this.model.quantity_TUE)){
            this.model.quantity_TUE = Number(this.model.quantity_TUE);
          }else{this.model.quantity_TUE = 0;}

          if(this.model.quantity_WED != null && this.model.quantity_WED != undefined && !isNaN(this.model.quantity_WED)){
            this.model.quantity_WED = Number(this.model.quantity_WED);
          }else{this.model.quantity_WED = 0;}

          if(this.model.quantity_THU != null && this.model.quantity_THU != undefined && !isNaN(this.model.quantity_THU)){
            this.model.quantity_THU = Number(this.model.quantity_THU);
          }else{this.model.quantity_THU = 0;}

          if(this.model.quantity_FRI != null && this.model.quantity_FRI != undefined && !isNaN(this.model.quantity_FRI)){
            this.model.quantity_FRI = Number(this.model.quantity_FRI);
          }else{this.model.quantity_FRI = 0;}
          
          this.model.daysOfWeekNotes = "";
        }
        
        this.model.createdBy = 0;
    
        this.invoiceService.AddUpdateBilling(this.model).subscribe(res => {
    
          if(res?.result){
            this.toastr.successToastr(JSON.stringify(res?.data), 'Success!');
            this.getActiveBill();
            this.getExpiredBill();
          }else{
            this.toastr.errorToastr(JSON.stringify(res?.data), 'Failed!');
          }
          this.decline();
        })
      }
      
    }
    

  }


  updateBilling(billingId:number,payerId:number,template: TemplateRef<any>) {
    this.getServiceCodeByPayerId(payerId);
    this.isUpdateVisible = true;
    this.isAddVisible = false;
    setTimeout(() => {
      
      this.invoiceService.getBillingDetailsByBillingId(billingId).subscribe(res => {
        if(res != null && res != undefined && res.result){
          this.currentClinetBill = res.data;
          this.model = this.currentClinetBill;
          let todate = new Date(this.currentClinetBill.toDate);
          let fromDate = new Date(this.currentClinetBill.fromDate);
          let totrasformDate = this.datepipe.transform(todate, 'MM-dd-yyyy')||""
          let fromtrasformDate = this.datepipe.transform(fromDate, 'MM-dd-yyyy')||""
          this.model.toDate = totrasformDate;
          this.model.fromDate = fromtrasformDate;
          this.isAddVisible = false;
          this.isUpdateVisible = true;
          this.modalRef = this.modalService.show(template);
          var el = document.querySelector('.modal-dialog');
          if(el != null && el != undefined){
            el.className += ' modal-dialog-lg';
          }
        }
      })

    }, 1000);
  }


  deleteBillingData(billingId : number) {
    this.invoiceService.deleteBilling(billingId).subscribe(res => {
      if(res.result){
        this.toastr.successToastr(JSON.stringify(res.data),'Success!');
        this.getActiveBill();
        this.getExpiredBill();
      }else{
        this.toastr.errorToastr(JSON.stringify(res?.data), 'Failed!');
      }
    })
  }


  getClinetBillingById(billingId: number) {
    this.invoiceService.getBillingDetailsByBillingId(billingId).subscribe(res => {
      if(res.result){
        this.currentClinetBill = res.data;
      }
    })
  }


  onClickUpdate(){
    this.model.payerId = Number(this.model.payerId);
    this.model.contractClientId = this.model.contractClientId;
    this.model.serviceCode = Number(this.model.serviceCode);

    if(!this.byDaysOfWeekToggle){
      this.model.brServiceCode_SAT = Number(this.model.brServiceCode_SAT);
      this.model.brServiceCode_SUN = Number(this.model.brServiceCode_SUN);
      this.model.brServiceCode_MON = Number(this.model.brServiceCode_MON);
      this.model.brServiceCode_TUE = Number(this.model.brServiceCode_TUE);
      this.model.brServiceCode_WED = Number(this.model.brServiceCode_WED);
      this.model.brServiceCode_THU = Number(this.model.brServiceCode_THU);
      this.model.brServiceCode_FRI = Number(this.model.brServiceCode_FRI);
  
      this.model.quantity_SAT = Number(this.model.quantity_SAT);
      this.model.quantity_SUN = Number(this.model.quantity_SUN);
      this.model.quantity_MON = Number(this.model.quantity_MON);
      this.model.quantity_TUE = Number(this.model.quantity_TUE);
      this.model.quantity_WED = Number(this.model.quantity_WED);
      this.model.quantity_THU = Number(this.model.quantity_THU);
      this.model.quantity_FRI = Number(this.model.quantity_FRI);
      
      this.model.periodEpisode_Notes = " ";
      this.model.serviceCode = 0;
      this.model.hoursAuthorizedPerWeek = "";
      this.model.hoursAuthorizedPerMonth= "";
      this.model.hoursAuthorizedEntirePeriod ="";
      this.model.occurencesAuthorizedPerWeek = "";
      this.model.occurencesAuthorizedPerMonth ="";
      this.model.occurencesAuthorizedEntirePeriod ="";

      let totrasformDate = this.datepipe.transform(this.model.toDate, 'MM-dd-yyyy')||""
      let fromtrasformDate = this.datepipe.transform(this.model.fromDate, 'MM-dd-yyyy')||""
      this.model.fromDate = fromtrasformDate;
      this.model.toDate = totrasformDate;
    }else{
      this.model.brServiceCode_SAT = 0;
      this.model.brServiceCode_SUN = 0;
      this.model.brServiceCode_MON = 0;
      this.model.brServiceCode_TUE = 0;
      this.model.brServiceCode_WED = 0;
      this.model.brServiceCode_THU = 0;
      this.model.brServiceCode_FRI = 0;
      this.model.quantity_SAT = 0;
      this.model.quantity_SUN = 0;
      this.model.quantity_MON = 0;
      this.model.quantity_TUE = 0;
      this.model.quantity_WED = 0;
      this.model.quantity_THU = 0;
      this.model.quantity_FRI = 0;
      this.model.fromDate = this.model.fromDate;
      this.model.toDate = this.model.toDate;
      this.model.daysOfWeekNotes = "";
    }

     this.invoiceService.AddUpdateBilling(this.model).subscribe(res => {
      
      if(res?.result){
        this.toastr.successToastr(JSON.stringify(res?.data), 'Success!');
        
        this.decline();
        this.isUpdateVisible = false;
        this.isAddVisible = true;
        this.getActiveBill();
        this.getExpiredBill();
      }else{
        this.toastr.errorToastr(JSON.stringify(res?.data), 'Failed!');
        this.decline();
        this.isUpdateVisible = false;
        this.isAddVisible = true;
      }
    })
  }

  getNewServiceCode(){
    this.getServiceCodeByPayerId(this.model.payerId);
  }


  getServiceCodeByPayerId(payerId: number) {
    this.invoiceService.getServiceCodeByPayerId(payerId).subscribe(res => {
      if(res.result){
        this.serviceCode = res.data;
      }
    })
  }

  initClientBill(){
      this.model.billingId = 0;
      this.model.brServiceCode_SAT = 0;
      this.model.brServiceCode_SUN = 0;
      this.model.brServiceCode_MON = 0;
      this.model.brServiceCode_TUE = 0;
      this.model.brServiceCode_WED = 0;
      this.model.brServiceCode_THU = 0;
      this.model.brServiceCode_FRI = 0;
      this.model.quantity_SAT = 0;
      this.model.quantity_SUN = 0;
      this.model.quantity_MON = 0;
      this.model.quantity_TUE = 0;
      this.model.quantity_WED = 0;
      this.model.quantity_THU = 0;
      this.model.quantity_FRI = 0;
      this.model.daysOfWeekNotes = "";
      this.model.periodEpisode_Notes = "";
      this.model.serviceCode = 0;
      this.model.hoursAuthorizedPerWeek = "";
      this.model.hoursAuthorizedPerMonth= "";
      this.model.hoursAuthorizedEntirePeriod ="";
      this.model.occurencesAuthorizedPerWeek = "";
      this.model.occurencesAuthorizedPerMonth ="";
      this.model.occurencesAuthorizedEntirePeriod ="";
  }

  copyQuantity(){
    if((<HTMLInputElement>document.getElementById("quantity_SAT")).value != null && (<HTMLInputElement>document.getElementById("quantity_SAT")).value != undefined){
      this.Quantity = parseInt((<HTMLInputElement>document.getElementById("quantity_SAT")).value);
      this.model.quantity_MON = this.Quantity;
      this.model.quantity_TUE = this.Quantity;
      this.model.quantity_WED = this.Quantity;
      this.model.quantity_THU = this.Quantity;
      this.model.quantity_FRI = this.Quantity;
      this.model.quantity_SUN = this.Quantity;
    }
    }
  
}

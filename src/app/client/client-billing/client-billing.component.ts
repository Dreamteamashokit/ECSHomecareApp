import { ClientBilling } from './../../models/client/client-billling-model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemsList } from 'src/app/models/common';
import { CommonService } from 'src/app/services/common.service';
import { NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DatePipe } from '@angular/common';

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
  clientBills = Array<ClientBilling>();
  currentClinetBill:ClientBilling = new ClientBilling();

  activeClinetBills = Array<ClientBilling>();
  expiredClientBills = Array<ClientBilling>();



  @ViewChild('frmclientbill') public addBillFrm: NgForm;
  constructor(
    private modalService: BsModalService,
    private commonService: CommonService,
    private invoiceService:InvoiceService,
    public toastr: ToastrManager,
    private datepipe: DatePipe,
    
    ) { }

 
  ngOnInit(): void {
    this.getPayerList();
    this.getActiveBillAndExpiredBill();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

  getActiveBillAndExpiredBill(){
    console.log("Calling....")
    this.clientBills =  Array<ClientBilling>();
    this.activeClinetBills = Array<ClientBilling>();
    this.expiredClientBills = Array<ClientBilling>();

    this.invoiceService.GetActiveBillAndExpiredBill(true).subscribe(res => {
      if(res?.result){
        this.clientBills = res?.data;

        this.clientBills.forEach(item => {
          if(this.isExpired(item.toDate,item.fromDate)){
            this.expiredClientBills.push(item);
          }else{
            this.activeClinetBills.push(item);
          }
        })
      }
      console.log(this.expiredClientBills,"Expired");
      console.log(this.activeClinetBills,"Active");
    });
  }

  onClickSubmit(){
    this.model.billingId = 0;
    this.model.payerId = Number(this.model.payerId);
    this.model.contractClientId = Number(this.model.contractClientId);
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
      
      this.model.periodEpisode_Notes = "";
      this.model.serviceCode = 0;
      this.model.hoursAuthorizedPerWeek = "",
      this.model.hoursAuthorizedPerMonth= "",
      this.model.hoursAuthorizedEntirePeriod ="",
      this.model.occurencesAuthorizedPerWeek = "",
      this.model.occurencesAuthorizedPerMonth ="",
      this.model.occurencesAuthorizedEntirePeriod =""

    }else{
      this.model.brServiceCode_SAT = 0
      this.model.brServiceCode_SUN = 0
      this.model.brServiceCode_MON = 0
      this.model.brServiceCode_TUE = 0
      this.model.brServiceCode_WED = 0
      this.model.brServiceCode_THU = 0
      this.model.brServiceCode_FRI = 0
      this.model.quantity_SAT = 0
      this.model.quantity_SUN = 0
      this.model.quantity_MON = 0
      this.model.quantity_TUE = 0
      this.model.quantity_WED = 0
      this.model.quantity_THU = 0
      this.model.quantity_FRI = 0
      
      this.model.daysOfWeekNotes = ""
    }
    
    this.model.createdBy = 0;

    console.log(this.model);
    this.invoiceService.AddUpdateBilling(this.model).subscribe(res => {

      if(res?.result){
        this.toastr.successToastr(JSON.stringify(res?.data), 'Success!');
        this.getActiveBillAndExpiredBill();
      }else{
        this.toastr.errorToastr(JSON.stringify(res?.data), 'Failed!');
      }
      this.decline();
     

    })
  }
  updateBilling(billingId:number,template: TemplateRef<any>) {
    //this.getClinetBillingById(billingId);
    this.invoiceService.getBillingDetailsByBillingId(billingId).subscribe(res => {
      if(res.result){
        this.currentClinetBill = res.data;
        console.log(this.currentClinetBill);

        this.model = this.currentClinetBill;
        let todate = new Date(this.currentClinetBill.toDate);
        let fromDate = new Date(this.currentClinetBill.fromDate);
        let totrasformDate = this.datepipe.transform(todate, 'MM-dd-yyyy')||""
        let fromtrasformDate = this.datepipe.transform(fromDate, 'MM-dd-yyyy')||""
        console.log(totrasformDate,"DATE");
        this.model.toDate = totrasformDate;
        this.model.fromDate = fromtrasformDate;

        this.isAddVisible = false;
        this.isUpdateVisible = true;
        this.modalRef = this.modalService.show(template);
      }
    })

  }

  deleteBillingData(billingId : number) {
    console.log(billingId + "Deleting..")
    this.invoiceService.deleteBilling(billingId).subscribe(res => {
      if(res.result){
        this.toastr.successToastr(JSON.stringify(res.data),'Success!');
        this.getActiveBillAndExpiredBill();
      }else{
        this.toastr.errorToastr(JSON.stringify(res?.data), 'Failed!');
      }
    })
  }

  getClinetBillingById(billingId: number) {
    this.invoiceService.getBillingDetailsByBillingId(billingId).subscribe(res => {
      if(res.result){
        this.currentClinetBill = res.data;
        console.log(this.currentClinetBill);
      }
    })
  }
  onClickUpdate(){
    this.model.payerId = Number(this.model.payerId);
    this.model.contractClientId = Number(this.model.contractClientId);
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
      
      this.model.periodEpisode_Notes = "";
      this.model.serviceCode = 0;
      this.model.hoursAuthorizedPerWeek = "",
      this.model.hoursAuthorizedPerMonth= "",
      this.model.hoursAuthorizedEntirePeriod ="",
      this.model.occurencesAuthorizedPerWeek = "",
      this.model.occurencesAuthorizedPerMonth ="",
      this.model.occurencesAuthorizedEntirePeriod =""

    }else{
      this.model.brServiceCode_SAT = 0
      this.model.brServiceCode_SUN = 0
      this.model.brServiceCode_MON = 0
      this.model.brServiceCode_TUE = 0
      this.model.brServiceCode_WED = 0
      this.model.brServiceCode_THU = 0
      this.model.brServiceCode_FRI = 0
      this.model.quantity_SAT = 0
      this.model.quantity_SUN = 0
      this.model.quantity_MON = 0
      this.model.quantity_TUE = 0
      this.model.quantity_WED = 0
      this.model.quantity_THU = 0
      this.model.quantity_FRI = 0
      
      this.model.daysOfWeekNotes = ""
    }


    this.model.toDate = new Date(this.model.toDate).toISOString();
    this.model.fromDate = new Date(this.model.fromDate).toISOString();
     this.invoiceService.AddUpdateBilling(this.model).subscribe(res => {

      if(res?.result){
        this.toastr.successToastr(JSON.stringify(res?.data), 'Success!');
        this.decline();
      }else{
        this.toastr.errorToastr(JSON.stringify(res?.data), 'Failed!');
        this.decline();
      }
     
      console.log(res?.data);
    })
  }

  isExpired(toDate:any,fromDate:any){
    let toDatObejct = new Date(toDate).toISOString();
    let fromDatObejct = new Date(fromDate).toISOString();
    let currentDate = new Date().toISOString();
    
    console.log(toDate,"toDate");
    console.log(currentDate,"currenTdate");


    if(toDatObejct<currentDate){
      return true;
    }else{
      return false;
    }

  }

}

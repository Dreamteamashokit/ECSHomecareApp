import { Component, OnInit,TemplateRef } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { RateViewModel }  from './../../models/client/client-billling-model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-payerrate',
  templateUrl: './payerrate.component.html',
  styleUrls: ['./payerrate.component.scss','../../../assets/css/orange-blue.css']
})

export class PayerrateComponent implements OnInit {
  

  constructor(private invoiceService:InvoiceService,private router: Router, 
              private modalService: BsModalService,public datepipe: DatePipe) { 

  }

  modalRef?: BsModalRef;
  rateList:any;
  rateDetails:any;

  ngOnInit(): void {
    this.GetPayerRateList();
  }


  GetPayerRateList() {
  
    this.invoiceService.GetPayerRateList().subscribe(res => {
      if(res != null && res != undefined && res.result){
        this.rateList = res.data;
      }
    })
  }


  GetPayerRateDetails(rateId:number) {
    this.invoiceService.GetPayerRateDetails(rateId).subscribe(res => {
      if(res != null && res != undefined && res.result){  
        
        this.rateDetails = res.data;
      }
    })
  }

  navigate(path: string) {
    this.router.navigate([path])
  }

  openModal(rateId:number,template: TemplateRef<any>) {
    this.GetPayerRateDetails(rateId);
    
    this.modalRef = this.modalService.show(template,{
      class: 'modal-dialog-centered modal-md',
      ignoreBackdropClick: true
    });
  }

}

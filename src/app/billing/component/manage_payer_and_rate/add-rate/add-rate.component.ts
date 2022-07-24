import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemsList } from 'src/app/models/common';
import { CommonService } from 'src/app/services/common.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { UserModel } from '../../../../models/account/login-model';
import { EmployeeapiService } from '../../../../services/employeeapi.service';
import { RateModel } from '../model/rate.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RateViewModel }  from 'src/app/models/client/client-billling-model';

import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';

import { setTheme } from 'ngx-bootstrap/utils';





@Component({
    selector: 'app-add-rate',
    templateUrl: './add-rate.component.html',
    styleUrls: ['../../../../../assets/css/orange-blue.css']

})
export class AddRateComponent implements OnInit {

    model: RateModel = new RateModel()
    currentUser: UserModel;
    payerItemList = Array<ItemsList>();



    modalRef?: BsModalRef;
    rateList:any;
    rateDetails:any;
    rateReadDetails:any;
    unitstr:string;
    typestr:string;
    mutualGroup:boolean;
    




    @ViewChild('addRateForm') public addRateFrm: NgForm;
    constructor(
        public datepipe: DatePipe,
        private empApi: EmployeeapiService,
        private commonService: CommonService,
        private invoiceService:InvoiceService,
        public toastr: ToastrManager,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: BsModalService,
    ) {
        setTheme('bs3'); 
     }

    ngOnInit(): void {
        this.getPayerList()
        this.GetPayerRateList();
        this.route.params.subscribe(
            (params: Params) => {
              this.model.payerid = Number(params["payerId"]);
          
            }
          );
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
        
        setTimeout(() => {
          this.modalRef = this.modalService.show(template,{
            class: 'modal-dialog-centered modal-md',
            ignoreBackdropClick: true
          });
      
          var el = document.querySelector('.modal-dialog');
          if(el != null && el != undefined){
            el.className += ' modal-dialog-lg';
          }  
        }, 1000);
        
      }
    
      rateChangeConfirmation(rate:any,template: TemplateRef<any>){
        if(confirm("Are you sure you want to change rate?")) {
          this.editModal(rate,template);
        }
      }
    
      editModal(rate:any,template: TemplateRef<any>){
        this.model = rate;
        this.rateReadDetails = rate;
        this.typestr = rate.type;
        if(rate != null && rate != undefined && rate.type == 'Hourly')
        {
          this.model.type = 1;
        }
        else if(rate != null && rate != undefined && rate.type == 'Daily'){
          this.model.type = 2;
        }
        else if(rate != null && rate != undefined && rate.type == 'Visit'){
          this.model.type = 3;
        }
        else if(rate != null && rate != undefined && rate.type == 'Travel'){
          this.model.type = 4;
        }
        
        this.unitstr = rate.unit;
        
        if(rate != null && rate != undefined && rate.unit != null && rate.unit != undefined){
          var splitunit = this.model.unit.split(' ');
          if(splitunit != null && splitunit != undefined && splitunit.length > 1){
            this.model.unit = splitunit[0];
            this.model.per = splitunit[1].toString();
          }  
        }
        
        if(rate != null && rate != undefined && rate.mutualGroup != undefined && rate.mutualGroup == 'Un-Mutual')
        {
          this.model.mutualGroup = false;  
        }
        else if(rate != null && rate != undefined && rate.mutualGroup != undefined && rate.mutualGroup == 'Mutual')
        {
          this.model.mutualGroup = true;  
        }
        else{
          this.model.mutualGroup = false;  
        }
        this.modalRef?.hide();
        setTimeout(() => {
    
          this.modalRef = this.modalService.show(template,{
            class: 'modal-dialog-centered modal-md',
            ignoreBackdropClick: true
          });
    
          var el = document.querySelector('.modal-dialog');
          if(el != null && el != undefined){
            el.className += ' modal-dialog-lg';
          }  
        }, 1000);
        
      }
    
    
  
    
      DeleteRate(rateId:number){
        debugger;
        this.invoiceService.DeleteRate(rateId).subscribe(res => {
          if(res != null && res != undefined && res.result){
            this.GetPayerRateList();
          }
        })
      }


    onClickSubmit(addRateForm:NgForm) {
        debugger;
        if(addRateForm.valid){
            this.model.rateid = 0;
            this.model.payerid = Number(this.model.payerid);
            if(!isNaN(this.model.taxRate)){
                this.model.taxRate = Number(this.model.taxRate); 
            }
            else{
                this.model.taxRate = 0; 
            } 
            if(this.model.unit != null && this.model.unit != undefined &&  this.model.hourly !=null && this.model.hourly != undefined)
            {
                this.model.unit = this.model.unit + " " + this.model.hourly;
            }
            else if(this.model.unit != null && this.model.unit != undefined &&  (this.model.hourly == null || this.model.hourly == undefined))
            {
                this.model.unit = this.model.unit;
            }
            else if(this.model.unit == null && this.model.unit == undefined &&  (this.model.hourly != null && this.model.hourly != undefined)){
                this.model.unit = this.model.hourly.toString();
            }
            
            this.model.hourly = 0;
            this.model.type = Number(this.model.type);
            this.model.livein = 0;
            this.model.visit = 0;
            this.model.createdBy = 0;
            const rateObj: RateModel = this.model;
    
            this.invoiceService.addUpdatePayerRate(this.model).subscribe(res => {
    
                if(res != null && res != undefined){
                    this.toastr.successToastr('Rate Added', 'Success!');
                    this.router.navigateByUrl('/billing');
                }
                else{
                    this.toastr.successToastr('Rate Added', 'Something wrong while add rate!');
                }
            })
        }
    }

    getPayerList() {
        this.commonService.getPayers().subscribe(res => {
            if(res != null && res != undefined){
                this.payerItemList = res.data;
            }
        });
    }

    editSubmit(editRateForm:NgForm) {
        if(editRateForm.valid)
        {
            this.model.rateid = Number(this.rateDetails.rateId);
            this.model.payerid = Number(this.rateDetails.payerId);
            if(editRateForm.value != null && editRateForm.value != undefined)
            {
              this.model.billCode = editRateForm.value.billCode;
              this.model.hourly = editRateForm.value.hourly;
              this.model.modifiers1 = editRateForm.value.modifiers1;
              this.model.modifiers2 = editRateForm.value.modifiers2;
              this.model.modifiers3 = editRateForm.value.modifiers3;
              this.model.modifiers4 = editRateForm.value.modifiers4;
              this.model.serviceCode = editRateForm.value.serviceCode;
              this.model.type = Number(editRateForm.value.type);
              
              this.model.placeOfService = editRateForm.value.placeofService;
              this.model.notes = editRateForm.value.Notes;
              this.model.revenueCode = editRateForm.value.revenueCode;
              this.model.taxRate = editRateForm.value.taxRate;
              
              // if(this.model.mutualGroup != null && this.model.mutualGroup != undefined){
              //   this.model.mutualGroup = false;
              // }
              if(editRateForm.value.validFrom != null && editRateForm.value.validFrom != undefined)
              {
                this.model.validFrom = editRateForm.value.validFrom;
              }
              else
              {
                this.model.validFrom = this.rateDetails.validFrom;
              }
              if(editRateForm.value.validTo != null && editRateForm.value.validTo != undefined)
              {
                this.model.validTo = editRateForm.value.validTo;
              }
              else
              {
                this.model.validTo = this.rateDetails.validTo;
              }
            }
            if(!isNaN(editRateForm.value.taxRate)){
                this.model.taxRate = Number(editRateForm.value.taxRate); 
            }
            else{
                this.model.taxRate = 0; 
            } 
            if(this.model.unit != null && this.model.unit != undefined &&  this.model.per !=null && this.model.per != undefined)
            {
                this.model.unit = this.model.unit + " " + this.model.per;
            }
            else if(this.model.unit != null && this.model.unit != undefined &&  (this.model.per == null || this.model.per == undefined))
            {
                this.model.unit = this.model.unit;
            }
            else if(this.model.unit == null && this.model.unit == undefined &&  (this.model.per != null && this.model.per != undefined)){
                this.model.unit = this.model.per.toString();
            }
            
            this.model.hourly = 0;
            this.model.livein = 0;
            this.model.visit = 0;
            this.model.createdBy = 0;
            const rateObj: RateModel = this.model;
    
            this.invoiceService.addUpdatePayerRate(this.model).subscribe(res => {
    
                if(res != null && res != undefined){
                    this.toastr.successToastr('Rate Updated', 'Success!');
                    this.GetPayerRateList();
                    this.modalRef?.hide();
                }
                else{
                    this.toastr.successToastr('Rate Updated', 'Something wrong while add rate!');
                }
            })
        }
        else{
          this.toastr.warningToastr('Rate Updated', 'Please fill required field!');
        }
      }
    

}

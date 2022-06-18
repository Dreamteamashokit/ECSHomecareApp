import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemsList } from 'src/app/models/common';
import { CommonService } from 'src/app/services/common.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { UserModel } from '../../../../models/account/login-model';
import { EmployeeapiService } from '../../../../services/employeeapi.service';
import { RateModel } from '../model/rate.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-rate',
    templateUrl: './add-rate.component.html',
    styleUrls: ['../../../../../assets/css/orange-blue.css']

})
export class AddRateComponent implements OnInit {

    //model: RateModel = Object.create({});
    model: RateModel = new RateModel()
    currentUser: UserModel;
    payerItemList = Array<ItemsList>();

    @ViewChild('addRateForm') public addRateFrm: NgForm;
    constructor(
        public datepipe: DatePipe,
        private empApi: EmployeeapiService,
        private commonService: CommonService,
        private invoiceService:InvoiceService,
        public toastr: ToastrManager,
        private router: Router
        
    ) {
      
     }

    ngOnInit(): void {
        this.getPayerList()
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



}

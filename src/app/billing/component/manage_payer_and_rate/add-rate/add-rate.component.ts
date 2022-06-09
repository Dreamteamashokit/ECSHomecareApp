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
        public toastr: ToastrManager
        
    ) {
      
     }

    ngOnInit(): void {
        this.getPayerList()
    }

    onClickSubmit() {
        this.model.rateid = 0;
        this.model.payerid = Number(this.model.payerid);
        this.model.taxRate = Number(this.model.taxRate); 
        this.model.hourly = Number(this.model.hourly);
        this.model.type = Number(this.model.type);
        this.model.livein = 0;
        this.model.visit = 0;
        this.model.createdBy = 0;
        const rateObj: RateModel = this.model;
        console.log(this.model);

        this.invoiceService.addUpdatePayerRate(this.model).subscribe(res => {
            this.toastr.successToastr('Rate Added', 'Success!');
            //console.log(res);
        })
        
    }

    getPayerList() {
        this.commonService.getPayers().subscribe(res => {
            this.payerItemList = res.data;
        });
    }



}

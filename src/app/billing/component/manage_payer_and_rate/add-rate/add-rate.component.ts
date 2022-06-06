import { Component, OnInit } from '@angular/core';
import { ItemsList } from 'src/app/models/common';
import { CommonService } from 'src/app/services/common.service';
import { UserModel } from '../../../../models/account/login-model';
import { EmployeeapiService } from '../../../../services/employeeapi.service';
import { RateModel } from '../model/rate.model';

@Component({
    selector: 'app-add-rate',
    templateUrl: './add-rate.component.html',
    styleUrls: ['../../../../../assets/css/orange-blue.css']

})
export class AddRateComponent implements OnInit {

    model: RateModel = Object.create({});
    currentUser: UserModel;
    payerItemList = Array<ItemsList>();


    constructor(
        private empApi: EmployeeapiService,
        private commonService: CommonService
    ) { }

    ngOnInit(): void {
        this.getPayerList()
    }


    onClickSubmit() {

    }

    GetEmployeeRateLst() {
        //this.empApi.GetEmployeeRateLst(this.EmpId).subscribe((response) => {
        //    this.EmpRateObj = response.data;
        //});
    }

    getPayerList() {
        this.commonService.getPayers().subscribe(res => {
            this.payerItemList = res.data;
        });
    }



}

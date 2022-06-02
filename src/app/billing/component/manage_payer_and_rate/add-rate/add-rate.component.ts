import { Component, OnInit } from '@angular/core';
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


    constructor(private empApi: EmployeeapiService) { }

    ngOnInit(): void {
    }


    onClickSubmit() {
        debugger;
    }

    GetEmployeeRateLst() {
        //this.empApi.GetEmployeeRateLst(this.EmpId).subscribe((response) => {
        //    this.EmpRateObj = response.data;
        //});
    }



}

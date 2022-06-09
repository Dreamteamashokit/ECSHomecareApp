import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ItemsList } from 'src/app/models/common';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeRateModel } from 'src/app/models/employee/emp-rate'
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-emp-rate',
  templateUrl: './emp-rate.component.html',
  styleUrls: [

    '../../../assets/css/orange-blue.css',
    './emp-rate.component.scss']
})
export class EmpRateComponent implements OnInit {

  @ViewChild("template") templatelog: TemplateRef<any>;
  modalRef?: BsModalRef;

  clientList: ItemsList[] = [];
  payerList: ItemsList[] = [];
  empRateList: EmployeeRateModel[] = [];
  empId: number;
  model = new EmployeeRateModel();
  currentUser: UserModel;

  constructor(private comApi: CommonService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private accountApi: AccountService,
    private modalService: BsModalService,
    private empApi: EmployeeapiService,
    private clientapi: ClientApiService) {

    setTheme('bs3');
    this.currentUser = this.accountApi.getCurrentUser();
    this.model.effectiveDate = new Date();
    this.model.endDate = new Date();
    this.model.entityId = 0;
    this.comApi.getClientList().subscribe((response) => {
      if (response.result) {
        this.clientList = response.data;
      }
    });

    this.comApi.getPayers().subscribe((response) => {
      this.payerList = response.data;
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.empId = Number(params["empId"]);
        this.getRateLst(this.empId);
      }
    );


  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  decline(): void {


    this.model.effectiveDate = new Date();
    this.model.endDate = new Date();
    this.model.entityId = 0;
    this.modalRef?.hide();
  }

  onClickSubmit() {
    debugger;
    this.model.userId = Number(this.empId);
    this.model.empId = Number(this.empId);
    this.model.createdBy = this.currentUser.userId;

    this.model.hourly = Number(this.model.hourly);
    this.model.liveIn = Number(this.model.liveIn);
    this.model.visit = Number(this.model.visit);
    this.model.overHourly = Number(this.model.overHourly);
    this.model.overLiveIn = Number(this.model.overLiveIn);
    this.model.overVisit = Number(this.model.overVisit);

    const effective = this.model.effectiveDate;
    effective.setHours(0, 0, 0);
    const end = this.model.endDate;
    end.setHours(0, 0, 0);

    this.model.effectiveDate = effective;
    this.model.endDate = end;
    this.model.effectiveDateTime=this.datepipe.transform(this.model.effectiveDate, 'dd-MM-yyyy')||"";
    this.model.endDateTime=this.datepipe.transform(this.model.endDate, 'dd-MM-yyyy')||"";
  
    // this.model.optionalHour = Number(this.model.optionalHour);
    // this.model.optionalAddHour = Number(this.model.optionalAddHour);
    // this.model.travelTime = Number(this.model.travelTime);
    // this.model.gas = Number(this.model.gas);
    // this.model.extra = Number(this.model.extra);
    // this.model.mileage = Number(this.model.mileage);

    this.model.payerId = Number(this.model.payerId);
    this.model.clientId = Number(this.model.clientId);
    this.model.applyRateCheck = Boolean(this.model.applyRateCheck);

    this.empApi.SaveEmployeeRate(this.model).subscribe((response) => {
      this.decline();
      this.getRateLst(this.empId);


    });
  }

  getRateLst(empId: number) {
    this.empApi.GetEmployeeRateLst(this.empId).subscribe((response) => {
      this.empRateList = response.data;
    });
  }




  editItem(_item: EmployeeRateModel) {

    this.model.entityId = _item.rateId;
    this.model.clientId = _item.clientId;
    this.model.payerId = _item.payerId;

    this.model.description = _item.description;


    this.model.hourly = _item.hourly;
    this.model.liveIn = _item.liveIn;
    this.model.visit = _item.visit;

    this.model.overHourly = _item.overHourly;
    this.model.overLiveIn = _item.overLiveIn;
    this.model.overVisit = _item.overVisit;

    this.model.effectiveDate = new Date(_item.effectiveDate);
    this.model.endDate = new Date(_item.endDate);

    this.openModal(this.templatelog);
  }

  delItem(rateId: number) {
    debugger;
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.empApi.delEmpPayRate(rateId).subscribe((response) => {
        this.getRateLst(this.empId);
      });
    }
  }



}

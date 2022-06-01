import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientContactLog } from 'src/app/models/client/client-contactlog-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList, MasterType } from 'src/app/models/common';
import { LoginModel, UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { OtherInfoModel } from 'src/app/models/client/other-info-model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './other-information.component.scss']
})
export class OtherInformationComponent implements OnInit {
  modalRef?: BsModalRef;
  currentUser: UserModel;
  model = new OtherInfoModel();
  constructor(
    private comApi: CommonService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private clientApi: ClientApiService,
    private datepipe: DatePipe,
  ) {

    this.currentUser = this.accountApi.getCurrentUser();
    this.model.entityId=0;
 
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params : Params) =>{
        this.model.userId =Number(params["clientId"]);
        this.BindOtherInfo(this.model.userId);
      }
    );
  }




  BindOtherInfo(userId:number)
  {
    debugger;
    this.clientApi.getOtherInfo(userId).subscribe((response) => {
      if(response.result)
      {
        this.model = response.data;
      }
    });
  }

  saveChangesModel() {
    debugger;
    this.model.isActive = 1;
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.model.userId);
    this.model.dischargeDate = this.datepipe.transform(this.model.dischargeDate , 'dd-MM-yyyy')||"";   
    this.model.careDate = this.datepipe.transform(this.model.careDate , 'dd-MM-yyyy')||"";   
    this.model.serviceRequestDate = this.datepipe.transform(this.model.serviceRequestDate , 'dd-MM-yyyy')||"";   
    if(this.model.entityId==0)
    {
      this.clientApi.addOtherInfo(this.model).subscribe(Responce => {
      });
    }
    else
    {
      this.clientApi.updateOtherInfo(this.model).subscribe(Responce => {
      });
    }
    this.BindOtherInfo(this.model.userId);
  }

















}

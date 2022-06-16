import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientCommunityMaster } from 'src/app/models/client/client-community-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList, MasterType, SelectList } from 'src/app/models/common';
import { LoginModel, UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-client-community',
  templateUrl: './client-community.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css','./client-community.component.scss']
})
export class ClientCommunityComponent implements OnInit {
  modalRef?: BsModalRef;
  ClientId: number;
  ClientCommunityObjList: any;
  empList = Array<ItemsList>();
  model = new ClientCommunityMaster();
  currentUser: UserModel;
  @ViewChild("templategroupinfo") templategroupinfo: TemplateRef<any>; 
  cleintcommunityId: number = 0;
  countryData: SelectList[] = [];
  stateData: SelectList[] = [];
  constructor(
    private comApi: CommonService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private clientapi: ClientApiService,
    public toastr: ToastrManager,
  ) {     
    this.currentUser = this.accountApi.getCurrentUser();
    this.comApi.getCountryList().subscribe((response) => {
      this.countryData = response.data;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {       
        this.model.userId = Number(params["clientId"]);
        this.ClientId = Number(params["clientId"]);
        this.getClientcommunityRecord();
      }
    );
  }

  saveCommunity() {
   
    this.model.communityName = this.model.communityName;
    this.model.communityAddress = this.model.communityAddress;
    this.model.communityFloor = this.model.communityFloor;
    this.model.county = this.model.county;
    this.model.state = this.model.state;
    this.model.city = this.model.city;
    this.model.contact = this.model.contact;
    this.model.email = this.model.email;
    this.model.notes = this.model.notes;    
    this.model.isActive = 1;
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.model.userId);
    this.clientapi.SaveClientCommunity(this.model).subscribe(Responce => {
      this.toastr.successToastr("Community Saved !", 'Success!');
      this.decline();
      this.getClientcommunityRecord();
    })
  }

  getClientcommunityRecord() {
   
    this.model = new ClientCommunityMaster();
    this.model.userId = this.ClientId;
    this.clientapi.getClientCommunityRecord(this.model).subscribe((Response: any) => {
      this.ClientCommunityObjList = Response.data;
      
    })
  }
  OnChangeCountry(e: any): void {
   
    this.comApi.getStateList(e.target.value).subscribe((response) => {
      this.stateData = response.data;
    });
  }
  openModal(template: TemplateRef<any>) {    
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {
    this.model = new ClientCommunityMaster();
    this.modalRef?.hide();
  }
}

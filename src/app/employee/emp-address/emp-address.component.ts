import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { LocationService } from 'src/app/services/location.service';
import {  UserModel } from 'src/app/models/account/login-model';
import { AddressObj } from 'src/app/models/employee/address';
import { LocationView } from 'src/app/models/common/address-view';

import { CommonService } from 'src/app/services/common.service';
import { SelectList} from 'src/app/models/common';

import * as atlas from 'azure-maps-control';
@Component({
  selector: 'app-emp-address',
  templateUrl: './emp-address.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-address.component.scss']
})
export class EmpAddressComponent implements OnInit {
  modalRef?: BsModalRef;
  IsLoad:boolean;
  locModel = new LocationView();

  model = new AddressObj();
  currentUser: UserModel;
  stateList: SelectList[];
  private http: HttpClient
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService, 
    private accountApi: AccountService,
    private locSrv: LocationService,    
    private empApi: EmployeeapiService,
    private comApi: CommonService) {
    setTheme('bs3');
    this.model.isActive = 1;
    this.currentUser = this.accountApi.getCurrentUser();

    this.model.country='USA';
    this.comApi.getStateList('USA').subscribe((response) => {
      this.stateList = response.data;
    });

  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        debugger;
        if (params["empId"] != null) {
          this.model.empId = Number(params["empId"]);
        }
        else {
          this.model.empId = Number(params["clientId"]);
        }

        this.getAddress(this.model.empId);
      }
    );

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  decline(): void {

    this.modalRef?.hide();
  }

  saveAddress() {
    debugger;
    this.model.addressType = 1;
    const reqObj: AddressObj = this.model;
    reqObj.latitude=Number(this.model.latitude);
    reqObj.longitude=Number(this.model.longitude);
    reqObj.userId= this.model.userId;
    reqObj.createdBy=this.currentUser.userId;
    console.log('Search', reqObj);
    this.empApi.saveAddress(reqObj).subscribe((response) => {
      this.decline();
      this.getAddress(reqObj.empId);
    });
  }


  getAddress(empId: number) {
    this.empApi.geAddress(empId).subscribe((response) => {
      if (response.result) {
        this.model = response.data;
        this.model.empId=empId;
        this.model.userId=empId;
        this.locModel.Location=this.model.address;
        this.locModel.latitude=this.model.latitude;
        this.locModel.longitude=this.model.longitude;
        this.BindMap(this.locModel);
      }
      console.log("Address   :" + response.data);

    });
  }
  OnChangeAddress(model: AddressObj) { 
    
    debugger;
    this.IsLoad=true;
 this.locSrv.getGeoPoint(model.address).subscribe(
  (res: any) => { 
    var response=  res['results'].filter((x:any) => x.type === "Point Address");
        this.model.latitude = response[0].position.lat;
    this.model.longitude = response[0].position.lon;
    this.IsLoad=false;
  });
  }





  BindMap(current:LocationView) {
    debugger;
       //this.graphDiv.nativeElement.innerHTML = "";
      var azureMap = new atlas.Map('myMap', {
          center: [current.longitude , current.latitude],
          zoom: 12,
          language: 'en-US',
          authOptions: {
              authType: atlas.AuthenticationType.subscriptionKey,
              subscriptionKey: 'MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE'
          },
          enableAccessibility: false,
      });
      azureMap.events.add('ready', function () {
          /*Create a data source and add it to the map*/
          var dataSource = new atlas.source.DataSource();
          azureMap.sources.add(dataSource);
          var points: any[]=[];
          var cpoint = new atlas.Shape(new atlas.data.Point([Number(current.longitude), Number(current.latitude)])); 
          points.push(cpoint);    
          //Add the symbol to the data source.
          dataSource.add(points);
          //Create a symbol layer using the data source and add it to the map
          azureMap.layers.add(new atlas.layer.SymbolLayer(dataSource, ""));
      });
    }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }
  






  


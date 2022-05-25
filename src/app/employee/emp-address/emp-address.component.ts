import { Component, OnInit, TemplateRef,ViewChild, ElementRef,  } from '@angular/core';
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
  @ViewChild("addressMapId") addressMapId: ElementRef;

  model = new AddressObj();
  // geoObj = new LocationView();
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
debugger;
    this.route.params.subscribe(
      (params: Params) => {
        debugger;
        if (params["empId"] != null) {
          this.model.userId = Number(params["empId"]);
        }
        else {
          this.model.userId = Number(params["clientId"]);
        }

        this.getAddress(this.model.userId);
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
    
    this.IsLoad=true;
      this.locSrv.getGeoPoint(this.model.address).subscribe({
        error: (err) => { 
          console.log(err);
          alert("Some technical issue exist, Please contact to admin !");
          this.IsLoad=false;
        },    // errorHandler 
        next: (res: any) => {  
          var response=  res['results'].filter((x:any) => x.type === "Point Address");
          if(response != null && response != undefined){
            this.model.latitude = Number(response[0].position.lat);
            this.model.longitude = Number(response[0].position.lon);
          }
          this.model.createdBy=this.currentUser.userId;
          this.addAddress(this.model);
         }
    });

  }




  addAddress(item:AddressObj) {

    item.addressType = 1;
    const reqObj: AddressObj = item;
    reqObj.latitude=  item.latitude
    reqObj.longitude= item.longitude
    reqObj.userId= item.userId;
    reqObj.createdBy=   item.createdBy;
    this.empApi.saveAddress(reqObj).subscribe({
      error: (err) => { 
        console.log(err);
        this.IsLoad=false;
        alert("Some technical issue exist, Please contact to admin !");
      },    // errorHandler 
      next: (res: any) => {  
        this.decline();
        this.IsLoad=false;
        this.getAddress(reqObj.empId);
     
       }
  });
  }




  getAddress(empId: number) {
debugger;

    //this.IsLoad=true;
    this.empApi.geAddress(empId).subscribe({
      error: (err) => { 
        console.log(err);
         this.currentLoc();
      },    // errorHandler 
      next: (response:any) => {  
        if (response.result) {
          this.model = response.data;
          this.model.empId=empId;
          this.model.userId=empId;
          this.locModel.Location=this.model.address;
          this.locModel.latitude=this.model.latitude;
          this.locModel.longitude=this.model.longitude;
          this.BindMap(this.locModel);
        }
        else{
          this.currentLoc();
        }
       }
  });

  
  }

  currentLoc() {

 if (navigator.geolocation) 
 {
   navigator.geolocation.getCurrentPosition((position:any) => {
   if (position) {   
    this.locModel.latitude=Number(position.coords.latitude);
    this.locModel.longitude=   Number(position.coords.longitude);
    this.locModel.Location='E&S Home Care Solutions Of Lawrenceville';
    this.BindMap(this.locModel);
   }
 },
 (error: any) =>
   {

    this.locModel.latitude=40.735280;
    this.locModel.longitude= -74.169640;    
    this.locModel.Location='E&S Home Care Solutions Of Lawrenceville';
     console.log(error);
     this.BindMap(this.locModel);
    }
   );
  }
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

       this.addressMapId.nativeElement.innerHTML = "";
      var azureMap = new atlas.Map('addressMapId', {
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





      //Load the custom image icon into the map resources.
      azureMap.imageSprite.add('my-custom-icon', 'https://img.icons8.com/material-two-tone/2x/home--v2.png').then(function () {

    //Create a data source and add it to the map.
    var datasource = new atlas.source.DataSource();
    azureMap.sources.add(datasource);

    //Create a point feature and add it to the data source.
    datasource.add(new atlas.data.Feature(new atlas.data.Point([Number(current.longitude), Number(current.latitude)])));

    //Add a layer for rendering point data as symbols.
    azureMap.layers.add(new atlas.layer.SymbolLayer(datasource, "", {
      iconOptions: {
        image: 'my-custom-icon',
        size: 0.5
      }
    }));
  });








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
  






  


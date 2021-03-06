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
import { ToastrManager } from 'ng6-toastr-notifications';
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
  isClient:boolean=false;
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
    private comApi: CommonService,
    private toastr: ToastrManager) {
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
         
        if (params["empId"] != null) {
          this.model.userId = Number(params["empId"]);
          this.isClient=false;
        }
        else {
          this.model.userId = Number(params["clientId"]);
          this.isClient=true;
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


  getAddressPoint(item:string) {
     
    var loc = new LocationView();
    loc.Location=item;
    this.locSrv.getGeoPoint(item).subscribe({   
      next: (res: any) => {  
        var response=  res['results'].filter((x:any) => x.type === "Point Address" || x.type==="Street" || x.type==="Cross Street");
        loc.latitude = Number(response[0].position.lat);
        loc.longitude = Number(response[0].position.lon);
       },
       error: (err) => { 
       loc.latitude=this.currentUser.latitude;
       loc.longitude=this.currentUser.longitude;
       console.log(err);
      },   
      complete: () => { 
        return loc;
      }
  });
  }



  saveAddress() {
     
    this.IsLoad=true;
    this.model.createdBy=this.currentUser.userId;
    this.locSrv.getGeoPoint( this.model.address).subscribe({   
      next: (res: any) => {  
        var response=  res['results'].filter((x:any) => x.type === "Point Address" || x.type==="Street" || x.type==="Cross Street");
        this.model.latitude = Number(response[0].position.lat);
        this.model.longitude = Number(response[0].position.lon);
       },
       error: (err) => { 
        this.model.latitude=this.currentUser.latitude;
        this.model.longitude=this.currentUser.longitude;
       console.log(err);
       this.IsLoad=false;
      },   
      complete: () => { 
      
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
      next: (res: any) => {  
        this.decline();     
       },
       error: (err) => { 
        console.log(err);
        this.toastr.infoToastr("Some technical issue exist, Please contact to admin !", 'Info!');  
        //alert("Some technical issue exist, Please contact to admin !");
        this.IsLoad=false;
      },
      complete: () => {
        var loc = new LocationView();  
        loc.Location=this.model.address;
        loc.latitude=this.model.latitude;
        loc.longitude=this.model.longitude;   
        this.IsLoad = false;
        this.BindMap(loc);
        this.IsLoad=false;
      }
  });
  }

  getAddress(empId: number) {

 

    var loc = new LocationView();  
    this.IsLoad=true;
     loc.userId=empId;
    this.empApi.geAddress(empId).subscribe({ 
      next: (response:any) => {  

        if (response.result) {
          this.model = response.data;
          this.model.empId=empId;
          this.model.userId=empId;
          loc.Location=this.model.address;
          loc.latitude=this.model.latitude;
          loc.longitude=this.model.longitude;    
          loc.owner=this.model.owner; 
          //console.log(this.model); 
        }
        else
        {
          loc.latitude=this.currentUser.latitude;
          loc.longitude=this.currentUser.longitude;  
          loc.owner=this.currentUser.userName;
        }  
        try{
          if (response.result) {
          loc.flatNo=response.data.flatNo??"";
          loc.address=response.data.address??"";
          loc.country=response.data.country??"";
          loc.state=response.data.state??"";
          loc.city=response.data.city??"";
          loc.zipCode=response.data.zipCode??"";
        
          loc.fullAddress=loc.flatNo!=""?loc.fullAddress+", "+loc.flatNo:loc.fullAddress;
          loc.fullAddress=loc.address!=""?loc.fullAddress+", "+loc.address:loc.fullAddress;
          loc.fullAddress=loc.city!=""?loc.fullAddress+", "+loc.city:loc.fullAddress;
          loc.fullAddress=loc.state!=""?loc.fullAddress+", "+loc.state:loc.fullAddress;
          loc.fullAddress=loc.country!=""?loc.fullAddress+", "+loc.country:loc.fullAddress;
          }
          else{
            loc.fullAddress="";
          }
         // loc.fullAddress==loc.fullAddress.replace("undefined,","");
          
        }
        catch(ex){

        }     
       },
       error: (err) => { 
        console.log(err);     
        loc.latitude=this.currentUser.latitude;
        loc.longitude=this.currentUser.longitude;   
        loc.owner=this.currentUser.userName;
        this.IsLoad = false;
        this.BindMap(loc);
      },
      complete: () => { 
        this.IsLoad = false;
        this.BindMap(loc);
      }    

  });

  
  }

  BindMap(current: LocationView) {

    this.addressMapId.nativeElement.innerHTML = "";
 let isClient=this.isClient;
    var popup = new atlas.Popup({
      pixelOffset: [0, -18],
      closeButton: false,
    });

    var popupTemplate ='<div style="padding: 6px;" class="customInfobox"><div class="name"><a href="{url}">{name}</a><br/><div>{address}</div></div></div>';



    var newAzureMap = new atlas.Map("addressMapId", {
      center: [current.longitude, current.latitude],
      zoom: 12,
      language: "en-US",
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: "MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE",
      },
      enableAccessibility: false,
    });
    newAzureMap.events.add("ready", function () {
      /* Construct a zoom control*/
      var zoomControl = new atlas.control.ZoomControl();

      var zoomOption = {
        position: atlas.ControlPosition.TopLeft,
      };
      /* Add the zoom control to the map*/
      newAzureMap.controls.add(zoomControl, zoomOption);

      //Load the custom image icon into the map resources.
      newAzureMap.imageSprite
        .add(
          "my-custom-icon",
          "https://img.icons8.com/material-two-tone/2x/home--v2.png"
        )
        .then(function () {
          //Create a data source and add it to the map.
          var datasource = new atlas.source.DataSource();
          newAzureMap.sources.add(datasource);

          //Create a point feature and add it to the data source.
          // datasource.add(
          //   new atlas.data.Feature(
          //     new atlas.data.Point([
          //       Number(current.longitude),
          //       Number(current.latitude),
          //     ])
          //   )
          // );
          let currentUrl = '';
          if (isClient) {
            
             //window.location.replace('#/client/info/' + current.userId + '/5');
             var fullUrl = window.location.href.toLowerCase();     // Returns full URL (https://example.com/path/example.html)
             var domainUrl = window.location.origin;   // Returns base URL (https://example.com)
             var pageFor = window.location.pathname; // Returns path only (/path/example.html)
            //  var obj = { Page: pageFor, Url: (domainUrl + "/" + '#/client/info/' + current.userId + '/5') };
            var obj = { Page: pageFor, Url: fullUrl };
             history.pushState(obj, obj.Page, obj.Url);
             currentUrl = "/" + '#/client/info/' + current.userId + '/0';
          }
          else {
            currentUrl = '#/employee/info/' + current.userId + '/0';
  
          }
             //Create a point feature and add it to the data source.
             datasource.add(
              new atlas.data.Feature(
                new atlas.data.Point([Number(current.longitude), Number(current.latitude)]),
                { 
                  name: current.owner,
                  url:currentUrl ,
                  address :current.fullAddress 
                }
              ));

              var masterSymbolLayer=new atlas.layer.SymbolLayer(datasource, "", {
                iconOptions: {
                  image: 'my-custom-icon',
                  size: 0.5
                }
              });
          //Add a layer for rendering point data as symbols.
          newAzureMap.layers.add(masterSymbolLayer);

          
          //Add a hover event to the symbol layer.
          newAzureMap.events.add("mouseover", masterSymbolLayer, function (e) {
            //Make sure that the point exists.
            if (e.shapes && e.shapes.length > 0) {
              var content, coordinate;
              var shape = (<any>e.shapes)[0].data;
              let clientNameMap = shape.properties.name;
              let clientUrl = shape.properties.url;
              let fullAddress = shape.properties.address;
              fullAddress=fullAddress.replace("undefined,","");
              
			        content = popupTemplate.replace(/{name}/g, clientNameMap);
              content = content.replace(/{url}/g, clientUrl);
              content = content.replace(/{address}/g, fullAddress);

              coordinate = e.position;
              popup.setOptions({ content: content, position: coordinate });
              popup.open(newAzureMap);
            }
          });

        });
      // /*Create a data source and add it to the map*/
      // var dataSource = new atlas.source.DataSource();
      // azureMap.sources.add(dataSource);
      // var points: any[] = [];
      // var cpoint = new atlas.Shape(
      //   new atlas.data.Point([
      //     Number(current.longitude),
      //     Number(current.latitude),
      //   ])
      // );
      // points.push(cpoint);
      // //Add the symbol to the data source.
      // dataSource.add(points);
      // //Create a symbol layer using the data source and add it to the map
      // var AllSymbolLayerPoint=new atlas.layer.SymbolLayer(dataSource, "");
      // azureMap.layers.add(AllSymbolLayerPoint);

      
    });
  }
  
//   reloadCurrentRoute(currentUrl:string) {
     
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
//         this.router.navigate([currentUrl]);
//     });
// }
  ngAfterContentInit() {
    setTimeout(this.HidemyFunction, 2000);
  }

  HidemyFunction() {
    let maptooltiptext = document.getElementsByClassName("tooltiptext");
    console.log(maptooltiptext);
    var i = 0;
    for (i = 0; i < maptooltiptext.length; i++) {
      maptooltiptext[i].innerHTML = "";
    }

    document.getElementsByClassName(
      "azure-map-copyright-context"
    )[0].innerHTML = "";
  }
  
  }
  






  


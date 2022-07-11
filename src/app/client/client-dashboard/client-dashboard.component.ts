import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DatePipe } from "@angular/common";
import { ClientApiService } from "src/app/services/client-api.service";
import { ClientModel } from "src/app/models/client/client-model";
import { LocationView } from "src/app/models/common/address-view";
import { EmployeeapiService } from "src/app/services/employeeapi.service";
import { UserModel } from "src/app/models/account/login-model";
import { AccountService } from "src/app/services/account.service";
import * as atlas from "azure-maps-control";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrls: [
    "../../../assets/css/orange-blue.css",

    "./client-dashboard.component.scss",
  ],
})

export class ClientDashboardComponent implements OnInit {
  model = new ClientModel();
  currentUser: UserModel;
  geoObj = new LocationView();
  completedCompliance:any;
  pendingCompliance:any;
  @ViewChild("locMapId") locMapId: ElementRef;


  constructor(
    public route: ActivatedRoute,
    public datepipe: DatePipe,
    public clientSrv: ClientApiService,
    public empSrv: EmployeeapiService,
    private accountSrv: AccountService
  ) {
    this.currentUser = this.accountSrv.getCurrentUser();
    this.currentUser.userName =this.currentUser.firstName + " " + this.currentUser.middleName + " " + this.currentUser.lastName;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.model.clientId = Number(params["clientId"]);
      this.clientSrv
        .getClientDetail(this.model.clientId)
        .subscribe((responce) => {
         
          this.model = responce.data;
          //  DD MMM YYYY
          this.model.dob =
            this.datepipe.transform(this.model.dob, "dd-MMM-yyyy") || "";
        });

      this.getAddress(this.model.clientId);
      this.GetLatestThreeOverdueComplianceList(this.model.clientId);
    });
  }

  getAddress(userId: number) {
    this.geoObj.userId=userId;
    this.empSrv.geAddress(userId).subscribe({
      next: (response: any) => {
    
        if (response.result) {
          
          this.geoObj.latitude = response.data.latitude;
          this.geoObj.longitude = response.data.longitude;
          this.geoObj.Location = response.data.address;
          this.geoObj.owner=response.data.owner;
        } else {
          this.geoObj.latitude = this.currentUser.latitude;
          this.geoObj.longitude = this.currentUser.longitude;
          this.geoObj.owner=response.data.owner;
        }
      },
      error: (err) => {
        console.log(err);
        this.geoObj.latitude = this.currentUser.latitude;
        this.geoObj.longitude = this.currentUser.longitude;
        this.geoObj.owner=this.currentUser.userName;
      },
      complete: () => {
        this.BindMap(this.geoObj);
      },
    });
  }

  BindMap(current: LocationView) {

    this.locMapId.nativeElement.innerHTML = "";

    var popup = new atlas.Popup({
      pixelOffset: [0, -18],
      closeButton: false,
    });

    var popupTemplate ='<div style="padding: 6px;" class="customInfobox"><div class="name"><a href="{url}">{name}</a></div></div>';


    var azureMap = new atlas.Map("locMapId", {
      center: [current.longitude, current.latitude],
      zoom: 12,
      language: "en-US",
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: "MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE",
      },
      enableAccessibility: false,
    });
    azureMap.events.add("ready", function () {
      /* Construct a zoom control*/
      var zoomControl = new atlas.control.ZoomControl();

      var zoomOption = {
        position: atlas.ControlPosition.TopLeft,
      };
      /* Add the zoom control to the map*/
      azureMap.controls.add(zoomControl, zoomOption);

      //Load the custom image icon into the map resources.
      azureMap.imageSprite
        .add(
          "my-custom-icon",
          "https://img.icons8.com/material-two-tone/2x/home--v2.png"
        )
        .then(function () {
          //Create a data source and add it to the map.
          var datasource = new atlas.source.DataSource();
          azureMap.sources.add(datasource);

          //Create a point feature and add it to the data source.
          // datasource.add(
          //   new atlas.data.Feature(
          //     new atlas.data.Point([
          //       Number(current.longitude),
          //       Number(current.latitude),
          //     ])
          //   )
          // );

             //Create a point feature and add it to the data source.
             console.log(current);
             datasource.add(
              new atlas.data.Feature(
                new atlas.data.Point([Number(current.longitude), Number(current.latitude)]),
                { name: current.owner,
                  url:('#/client/info/' + current.userId + '/0') 
                
                }
              )
            );

            var masterSymbolLayer =  new atlas.layer.SymbolLayer(datasource, "", {
              iconOptions: {
                image: "my-custom-icon",
                size: 0.5,
              },
            })
          //Add a layer for rendering point data as symbols.
          azureMap.layers.add(masterSymbolLayer);

          
          //Add a hover event to the symbol layer.
          azureMap.events.add("mouseover", masterSymbolLayer, function (e) {
            //Make sure that the point exists.
            if (e.shapes && e.shapes.length > 0) {
              var content, coordinate;
              var shape = (<any>e.shapes)[0].data;
              var clientNameMap = shape.properties.name;
              var clientUrl = shape.properties.url;
            //  alert(clientUrl)
              content = popupTemplate.replace(/{name}/g, clientNameMap);
              content = content.replace(/{url}/g, clientUrl);

              coordinate = e.position;
              popup.setOptions({ content: content, position: coordinate });
              popup.open(azureMap);
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

  GetLatestThreeOverdueComplianceList(userId:number){
    this.empSrv.GetLatestThreeOverdueComplianceList(userId).subscribe((response)=>{
      if(response.result){
        
        this.completedCompliance = response.data.objThreeLatestCompletedCompliance;
        this.pendingCompliance = response.data.objThreeLatestPendingCompliance;
      }
    })
  }

}

import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { EmployeeapiService } from '../services/employeeapi.service';
import { LocationService } from '../services/location.service';
import { ExternalUserModel } from 'src/app/models/account/login-model';
import * as atlas from 'azure-maps-control';
import { DatePipe } from '@angular/common'
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
selector: 'app-hhaportal',                
templateUrl: './hhaportal.component.html',
styleUrls: ['./hhaportal.component.scss']
})
export class HhaportalComponent implements OnInit {

  IsLoad: boolean = false;
  empId:number;
  ClientList:any;
  HHAUserName:string;
  HHAModel = new ExternalUserModel();
  @ViewChild("graphDiv") graphDiv: ElementRef;

  constructor(private router:Router,private _employeeservice : EmployeeapiService,
    private _accountService:AccountService,private _locationsrv:LocationService, private toastr: ToastrManager,
    public datepipe: DatePipe) 
    { 
      // this.HHAModel.latitude = 33.740253;
      // this.HHAModel.longitude =-82.745857;
    }


    ngOnInit(): void {
      this.IsLoad=true;
      var objUser = this._accountService.GetCurrentHHAUser();
      
      if(objUser != null && objUser != undefined){
        this.HHAModel.email = objUser.email;
        this.HHAModel.firstName = objUser.firstName;
        this.HHAModel.lastName = objUser.lastName;
        this.HHAModel.middleName = objUser.middleName;
        this.HHAModel.userName = objUser.userName;
        this.HHAModel.latitude = objUser.latitude;
        this.HHAModel.longitude = objUser.longitude;
    
        this.empId = objUser.userId;
        this.HHAUserName = objUser.firstName + " " + objUser.middleName + " " + objUser.lastName; 
        this.GetClientListByempId(this.empId);
    
      }
      this.IsLoad=false;
    }
    



  GetClientListByempId(empId:number){
    this._employeeservice.GetClientListByempId(empId).subscribe((response) =>{
      if(response.result)
      {
        this.ClientList = response.data;
          if(this.ClientList != null && this.ClientList != undefined){
            this.loadMap(this.ClientList);
          }
          this.IsLoad=false;
      }
      else
      {
        this.IsLoad=false;
       // alert('HHA/Employee does not have any clients.');
        this.toastr.infoToastr("HHA/Employee does not have any clients. !", 'Info!');
        
        
      }
    })
  }




loadMap(ClientList:any) {
  var latitude = this.HHAModel.latitude;
  var longitude = this.HHAModel.longitude;

  this.graphDiv.nativeElement.innerHTML = "";
    var azureMap = new atlas.Map('myMap', {
        center: [longitude , latitude],
        zoom: .8,
        language: 'en-US',
        authOptions: {
              authType: atlas.AuthenticationType.subscriptionKey,
              subscriptionKey: 'MN84wEo1nrqpatQkVsnYlG1svQ9ZEw4IG6qU_6P82gE'
        },
        enableAccessibility: false,
        
        // boxZoomInteraction:true
    });


    //Update the style options at anytime using `setStyle` function.
    azureMap.setStyle({
renderWorldCopies: true,
showBuildingModels: true,
showLogo: false,
showFeedbackLink: false,
showTileBoundaries:false,
});

    azureMap.events.add('ready', function () {

      /* Construct a zoom control*/
    var zoomControl = new atlas.control.ZoomControl();
    
var zoomOption={ 
position:atlas.ControlPosition.TopLeft

};
  /* Add the zoom control to the map*/
  azureMap.controls.add(zoomControl,zoomOption);

      //Load the custom image icon into the map resources.
      azureMap.imageSprite.add('my-custom-icon', 'https://img.icons8.com/material-two-tone/2x/home--v2.png').then(function () {

    //Create a data source and add it to the map.
    var datasource = new atlas.source.DataSource();
    azureMap.sources.add(datasource);

    //Create a point feature and add it to the data source.
    datasource.add(new atlas.data.Feature(new atlas.data.Point([Number(longitude), Number(latitude)])));

    //Add a layer for rendering point data as symbols.
    azureMap.layers.add(new atlas.layer.SymbolLayer(datasource, ""
    // , {
    //   iconOptions: {
    //     image: 'my-custom-icon',
    //     size: 0.5
    //   }
    //}
    ));
  });
  
        /*Create a data source and add it to the map*/
        var dataSource = new atlas.source.DataSource();
        azureMap.sources.add(dataSource);
        var points: any[]=[];
      for (let i = 0; i < ClientList.length; i++) {
        var point = new atlas.Shape(new atlas.data.Point([Number(ClientList[i].longitude), Number(ClientList[i].latitude)])); 
        points.push(point);
      };
        //Add the symbol to the data source.
        dataSource.add(points);
        //Create a symbol layer using the data source and add it to the map
        azureMap.layers.add(new atlas.layer.SymbolLayer(dataSource, "", {
            iconOptions: {
              image: 'my-custom-icon',
              size: 0.5
            }
          }));
    });


  }

  ngAfterContentInit(){
    
    setTimeout(this.HidemyFunction, 2000)

      
 
  }

  HidemyFunction(){

    
    let maptooltiptext=  document.getElementsByClassName('tooltiptext');
    console.log(maptooltiptext);
          var i=0;
    for(i=0;i<maptooltiptext.length;i++){
      maptooltiptext[i].innerHTML='';
    }

    document.getElementsByClassName('azure-map-copyright-context')[0].innerHTML='';
  }

redirectToClockIn(objClient:any){
  var clientName = objClient.firstName + " " + objClient.middleName + " " + objClient.lastName;
  localStorage.setItem("SelectedClientName",clientName);
  localStorage.setItem("SelectedClient",JSON.stringify(objClient))
  this.router.navigate(['/clockinout']);
}

}

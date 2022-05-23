import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { EmployeeapiService } from '../services/employeeapi.service';
import { LocationService } from '../services/location.service';
import { ExternalUserModel } from 'src/app/models/account/login-model';
import * as atlas from 'azure-maps-control';

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
    private _accountService:AccountService,private _locationsrv:LocationService) { 
      this.HHAModel.latitude = 33.740253;
      this.HHAModel.longitude =-82.745857;
    }

  ngOnInit(): void {
    this.IsLoad=true;
    var objUser = this._accountService.GetCurrentHHAUser();
    
    if(objUser != null && objUser != undefined){
      // this.HHAModel.latitude = objUser.latitude;
      // this.HHAModel.longitude =-objUser.longitude;
      this.HHAModel.email = objUser.email;
      this.HHAModel.firstName = objUser.firstName;
      this.HHAModel.lastName = objUser.lastName;
      this.HHAModel.middleName = objUser.middleName;
      this.HHAModel.userName = objUser.userName;
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
        alert('HHA/Employee does not have any clients.');
      }
    })
  }


  loadMap(ClientList:any) {
    var latitude = this.HHAModel.latitude;
    var longitude = this.HHAModel.longitude;
  
    this.graphDiv.nativeElement.innerHTML = "";
    var azureMap = new atlas.Map('myMap', {
        center: [longitude , latitude],
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
        var cpoint = new atlas.Shape(new atlas.data.Point([longitude, latitude])); 
        points.push(cpoint);
        for (let i = 0; i < ClientList.length; i++) {
          var point = new atlas.Shape(new atlas.data.Point([Number(ClientList[i].longitude), Number(ClientList[i].latitude)])); 
          points.push(point);
        };
        //Add the symbol to the data source.
        dataSource.add(points);
        //Create a symbol layer using the data source and add it to the map
        azureMap.layers.add(new atlas.layer.SymbolLayer(dataSource, ""));
    });
  }
}

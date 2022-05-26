import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ClientModel } from 'src/app/models/client/client-model';
import { LocationView } from 'src/app/models/common/address-view';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import {  UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import * as atlas from 'azure-maps-control';
@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    
    './client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  model=new ClientModel();
  currentUser: UserModel;
  geoObj = new LocationView();
  @ViewChild("locMapId") locMapId: ElementRef;
  constructor(
    public route:ActivatedRoute,
    public datepipe: DatePipe,
    public clientSrv : ClientApiService,
    public empSrv : EmployeeapiService,
    private accountSrv: AccountService
    ) {

      this.currentUser = this.accountSrv.getCurrentUser();
     }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params : Params) =>{   
        
        this.model.clientId = Number(params["clientId"]);
        this.clientSrv.getClientDetail(this.model.clientId).subscribe(responce=>{     
          console.log(responce.data);    
           this.model=responce.data;   
          //  DD MMM YYYY
           this.model.dob = this.datepipe.transform(this.model.dob, 'dd-MMM-yyyy')||"";  
        });

this.getAddress(this.model.clientId);

      });
  }






  getAddress(userId: number) {
  
        this.empSrv.geAddress(userId).subscribe({     
          next: (response:any) => {  
            if (response.result) {
              this.geoObj.latitude=response.data.latitude;
              this.geoObj.longitude=response.data.longitude;
              this.geoObj.Location=response.data.address;
             
            }
            else{
       
              this.geoObj.latitude=this.currentUser.latitude;
              this.geoObj.longitude=this.currentUser.longitude;  
            }
           },
           error: (err) => { 
            console.log(err);
            this.geoObj.latitude=this.currentUser.latitude;
            this.geoObj.longitude=this.currentUser.longitude;  
      
          },  
           complete: () => { 

            this.BindMap(this.geoObj);
          }
      });
    
      
      }
    
    








      BindMap(current:LocationView) {
        debugger;
           this.locMapId.nativeElement.innerHTML = "";
          var azureMap = new atlas.Map('locMapId', {
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

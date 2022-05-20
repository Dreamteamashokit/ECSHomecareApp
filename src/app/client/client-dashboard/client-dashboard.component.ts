import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ClientModel } from 'src/app/models/client/client-model';
import { LocationView } from 'src/app/models/common/address-view';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    
    './client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {

  model=new ClientModel();
  geoObj = new LocationView();
  constructor(
    public route:ActivatedRoute,
    public datepipe: DatePipe,
    public clientSrv : ClientApiService) {
      this.geoObj.latitude=53.2734;
      this.geoObj.longitude=-7.77832031;
      this.geoObj.Location='location GPS coordinates';

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
      });
  }










}

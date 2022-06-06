import { Component, OnInit } from '@angular/core';
import { ClientApiService } from 'src/app/services/client-api.service';
import { ClientModel } from 'src/app/models/client/client-model';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType ,SelectList} from 'src/app/models/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general-client',
  templateUrl: './general-client.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './general-client.component.scss']
})
export class GeneralClientComponent implements OnInit {

  IsLoad: boolean = false;
  model = new ClientModel();

  constructor(
    private router:Router, 
    private route:ActivatedRoute,  
    public datepipe: DatePipe, 
    private clientApi : ClientApiService
    ) {   

     }
  ngOnInit(): void {

    this.route.params
    .subscribe(
      (params : Params) =>{
        this.model.clientId =Number(params["clientId"]);
        this.BindClientInfo(this.model.clientId);
      }
    );


  }

  BindClientInfo(userId:number)
  {
       
    console.log("Rakesh07");
    this.IsLoad=true;
    this.clientApi.getClientDetail(userId).subscribe((response) => {

if(response.result)
{
  this.model = response.data;
  console.log(response.data);
  this.model.dob = this.datepipe.transform(this.model.dob, 'dd-MMM-yyyy')||"";  

  console.log("Rakesh07");
}
this.IsLoad=false;
      
     
    });
  }

}

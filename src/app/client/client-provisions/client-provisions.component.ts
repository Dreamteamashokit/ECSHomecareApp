import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClientApiService } from 'src/app/services/client-api.service';
import{provisioninfo} from 'src/app/models/client/provisioninfo';

@Component({
  selector: 'app-client-provisions',
  templateUrl: './client-provisions.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css','./client-provisions.component.scss']
})
export class ClientProvisionsComponent implements OnInit {
  ProvisionItemlst:any;
  constructor(private route:ActivatedRoute,
    private modalService: BsModalService, private clientapi : ClientApiService) { }
UserId:number;
ModelLst: Array<provisioninfo> = [];

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{   
        
        this.UserId = Number(params["clientId"]);     
        this.getProvisionLst();
      });
  }

getProvisionLst()
{
   this.clientapi.getProvisionInfoList(this.UserId).subscribe(Response=>{
     this.ProvisionItemlst=Response.data;   
    
    this.ProvisionItemlst.forEach((item:any)=>{
      let obj=new provisioninfo();
        obj.provisionId=item.provisionId;
        obj.Userid=this.UserId;
        obj.Value=item.value;
        obj.IsChecked=Boolean(item.isChecked);
        obj.ProvisionType=Number(item.provisionType);
        obj.Description=item.desctiption;
       this.ModelLst.push(obj);
    });
   
   })
}

SaveProvisionData(){
  debugger;
  let data=this.ModelLst;
  this.clientapi.SaveProvisionInfoList(data).subscribe(Responce=>{

  });
}


}

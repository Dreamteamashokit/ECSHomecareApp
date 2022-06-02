import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';




import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { AccountService } from 'src/app/services/account.service';
import { ClientApiService } from 'src/app/services/client-api.service';


import { UserModel } from 'src/app/models/account/login-model';
import {  ProviderModel } from 'src/app/models/client/contact-model';


@Component({
  selector: 'app-client-emergency-info',
  templateUrl: './client-emergency-info.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css','./client-emergency-info.component.scss']
})
export class ClientEmergencyInfoComponent implements OnInit {
   
  modalRef?: BsModalRef;
  emergInfoTypeId:number;
  currentUser:UserModel;
  IsLoad:boolean;
  clientId:number;

  //physician=new ProviderModel();
  model=new ProviderModel();
  proModel=new ProviderModel();
  modelList: ProviderModel[]=[];

  constructor(
    private route:ActivatedRoute,
    private modalService: BsModalService,
    private acontSrv: AccountService,
    private clntSrv: ClientApiService
    ) 
    {
      setTheme('bs3');
      this.currentUser=acontSrv.getCurrentUser();
      this.proModel.contactType=4;
     }

  ngOnInit(): void {

    this.route.params.subscribe((params : Params) =>{   
        this.clientId = Number(params["clientId"]);  
        this.getProviderModel(this.clientId);   
      });

  }






  openPopup(template: TemplateRef<any>) {
      
    this.modalRef = this.modalService.show(template);
  }
  
  closeModal(): void {
   
    this.modalRef?.hide();
  }

 getProviderModel(_userId:number)
 {
   debugger;
   this.IsLoad=true;
   this.clntSrv.getEmergProvider(_userId).subscribe({   
     next: (response) => {  
      console.log(response);
      debugger;
       if(response.result)
       {    
         this.bindModel(response.data);  
         this.IsLoad=false;
       }
       else
       {
        this.model.contactType=3;
       }
     },
      error: (err) => { 
       this.IsLoad=false;
      console.log(err);
     },   
     complete: () => { 
       this.IsLoad=false;
     }
   });
 }

 bindModel(itemList: ProviderModel[])
 {
this.model=itemList.filter(x=>x.contactType===3)[0];
this.model.contactType=3;
this.modelList=itemList.filter(x=>x.contactType===4);

//this.modelList=itemList;

 }


 saveChanges(_item:ProviderModel)
 {
   _item.userId=this.clientId;
   _item.createdBy=this.currentUser.userId;
   this.IsLoad=true;
   this.clntSrv.addEmergProvider(_item).subscribe({   
     next: (res: any) => {  
       if(res.results)
       {
         this.IsLoad=false;
         alert("fggfg");
       }
     },
      error: (err) => { 
       this.IsLoad=false;
      console.log(err);
     },   
     complete: () => { 
       this.IsLoad=false;
     }
   });
 }






 
}

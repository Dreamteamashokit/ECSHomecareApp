import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { AccountService } from 'src/app/services/account.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { UserModel } from 'src/app/models/account/login-model';
import {  ProviderModel } from 'src/app/models/client/contact-model';
import { ToastrManager } from 'ng6-toastr-notifications';

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
  @ViewChild("template") templatelog: TemplateRef<any>;
  //physician=new ProviderModel();
  model=new ProviderModel();
  proModel=new ProviderModel();
  modelList: ProviderModel[]=[];

  constructor(
    private route:ActivatedRoute,
    private modalService: BsModalService,
    private acontSrv: AccountService,
    private clntSrv: ClientApiService,
    public dtPipe: DatePipe,
    public toastr: ToastrManager
    ) 
    {
      setTheme('bs3');
      this.currentUser=acontSrv.getCurrentUser();
      this.proModel.contactType=4;
      this.model.contactType=3;
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




  editProvider(editObj:ProviderModel) {
      
    this.proModel=editObj;

    this.proModel.dateExpires = new Date(editObj.dateExpires);
    this.openPopup(this.templatelog);
  }


  
  closeModal(): void {
    this.proModel=new ProviderModel();
    this.proModel.contactType=4;
    this.modalRef?.hide();
  }

 getProviderModel(_userId:number)
 {
         
   this.IsLoad=true;
   this.clntSrv.getEmergProvider(_userId).subscribe({   
     next: (response) => {  
      console.log(response);
            
       if(response.result)
       {    
              
         this.bindModel(response.data);  
         this.IsLoad=false;
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
        

if(itemList.filter(x=>x.contactType===3).length>0)
{
  this.model=itemList.filter(x=>x.contactType===3)[0];
  this.model.contactType=3;
}

if(itemList.filter(x=>x.contactType===4).length>0)
{
  this.modelList=itemList.filter(x=>x.contactType===4);
}




 }


 saveChanges(_item:ProviderModel)
 {
  if(_item.firstName && _item.lastName &&_item.title)
{

   _item.licenseExpires = this.dtPipe.transform(_item.dateExpires, 'dd-MM-yyyy')||"";

  this.saveData(_item);
}
else
{
  this.toastr.infoToastr("Please First Name & Last Name!", 'Info!');
  //alert("Please First Name & Last Name!");
}

 }


 saveData(_item:ProviderModel)
 {

        
  _item.userId=this.clientId;
  _item.createdBy=this.currentUser.userId;
  this.IsLoad=true;
  this.clntSrv.addEmergProvider(_item).subscribe({   
    next: (res: any) => {  
      if(res.result)
      {

              
        this.IsLoad=false;
        this.closeModal();
        this.getProviderModel(this.clientId);
      }
    },
     error: (err) => { 

            
      this.IsLoad=false;
     console.log(err);
    },   
    complete: () => { 
      this.IsLoad=false;
      this.closeModal();
    }
  });
 }



 delProvider(providerId:number) { 
      
  let isOk = confirm("Are you sure to delete?");
  if(isOk)
  {
    this.IsLoad=true;
  this.clntSrv.delEmergProvider(providerId).subscribe((response) => {
    this.IsLoad=false;
    this.getProviderModel(this.clientId);
}); 
  }

}


public formateDateTime(logTime:string)
{
 
  return this.dtPipe.transform(new Date(logTime), 'dd-MM-yyyy')||"";

}





 
}

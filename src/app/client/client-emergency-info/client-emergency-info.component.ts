import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';

import{ClientEmrgencyInfo} from 'src/app/models/client/EmergencyInfo';


@Component({
  selector: 'app-client-emergency-info',
  templateUrl: './client-emergency-info.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css','./client-emergency-info.component.scss']
})
export class ClientEmergencyInfoComponent implements OnInit {


  editMode:boolean=false;
  EmergencyInfoLst:any;
  modalRef?: BsModalRef;
model=new ClientEmrgencyInfo();
  constructor(
    private route:ActivatedRoute,
    private modalService: BsModalService, private clientapi : ClientApiService) {
     
     }
  ClientId:number;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{   
        
        this.ClientId = Number(params["clientId"]);     
        this.getEmergencyInfoList();
      });
  }



 
  getEmergencyInfoList()
  {
       this.clientapi.getEmergencyInfoList(this.ClientId).subscribe(Responce=>{     
         console.log(Responce.data);    
          this.EmergencyInfoLst=Responce.data;        
       });
  }


  openModal(template: TemplateRef<any>,item:any) {
   
    this.model.id=Number(item.id);
   this.model.TypeId=Number(item.typeId);
   this.model.title=item.title;
   this.model.relationship=item.relationship;
   this.model.email=item.email;
   this.model.typeName=item.typeName;
  this.model.firstName=item.firstName;
  this.model.lastName=item.lastName;
  this.model.nPINumber=item.npiNumber;
  this.model.license=item.license;
  this.model.city=item.city;
  this.model.licenseExpires=item.licenseExpires;
  this.model.phone=item.phone;
  this.model.fax=item.fax;
  this.model.state=item.state;
  this.model.address=item.address;
  this.model.zip=item.zip;
  this.model.isActive=item.isActive
  this.model.userId=Number(this.ClientId);
   this.modalRef = this.modalService.show(template);
 }
 
 decline(): void {
  
   this.modalRef?.hide();
 }

 onClickSubmit() { 
 debugger
  
  this.model.title=this.model.title;
  this.model.firstName=this.model.firstName;
  this.model.lastName=this.model.lastName;
  this.model.nPINumber=this.model.nPINumber;
  this.model.license=this.model.license;
  this.model.licenseExpires=this.model.licenseExpires;
  this.model.phone=this.model.phone;
  this.model.fax=this.model.fax;
  this.model.state=this.model.state;
  this.model.address=this.model.address;
  this.model.zip=this.model.zip;
  this.model.TypeId=Number(this.model.TypeId);
  this.model.id=Number(this.model.id);
  this.model.userId=Number(this.ClientId);

this.clientapi.SaveEmergencyInfo(this.model).subscribe(Response=>{
  debugger
  this.decline();
  this.getEmergencyInfoList()   
})

   }

   CreateNewContact(template: TemplateRef<any>){
    this.model.id=Number(0);
    this.model.TypeId=Number(4);
    this.modalRef = this.modalService.show(template);
   }
 
}

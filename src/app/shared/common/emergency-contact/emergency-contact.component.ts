import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ContactModel } from 'src/app/models/client/contact-model';
import { UserModel } from 'src/app/models/account/login-model';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { ClientApiService } from 'src/app/services/client-api.service';
@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: [
    '../../../../assets/css/orange-blue.css',
    './emergency-contact.component.scss']
})
export class EmergencyContactComponent implements OnInit {
 
  @Input() emergInfoTypeId:number;
  currentUser:UserModel;
  IsLoad:boolean;
  model=new ContactModel();
  constructor(
    private route: ActivatedRoute,
    private comSrv: CommonService,  
    private acontSrv: AccountService,
    private clntSrv: ClientApiService

  ) {
    this.currentUser=this.acontSrv.getCurrentUser();
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        debugger;
        if (params["clientId"] != null) {
          this.model.userId = Number(params["clientId"]);
          this.getContactModel(this.model.userId);
        }});
  }

  saveChanges(_item:ContactModel)
  {
if(_item.name)
{
  this.saveData(_item);
}
else
{
  alert("Please Input Name..!");
}


  }



  saveData(_item:ContactModel)
  {
    _item.contactType=this.emergInfoTypeId;
    _item.userId=this.model.userId;
    _item.createdBy=this.currentUser.userId;   

    this.IsLoad=true;
    this.clntSrv.addEmergContact(_item).subscribe({   
      next: (res: any) => {  
        if(res.results)
        {
          this.IsLoad=false;
          this.getContactModel(_item.userId);
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









  getContactModel(_userId:number,)
  {

    this.IsLoad=true;
    this.clntSrv.getEmergContact(_userId,this.emergInfoTypeId).subscribe({   
      next: (response) => {  
        if(response.result)
        { 
          this.model.name=response.data.name;
          this.model.email=response.data.email;
          this.model.phone=response.data.phone;
          this.model.relationship=response.data.relationship;
          this.model.entityId=response.data.entityId;
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











}

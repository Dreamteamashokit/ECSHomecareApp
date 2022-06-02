import { Component, OnInit,Input } from '@angular/core';
import { ContactModel } from 'src/app/models/client/contact-model';

import { UserModel } from 'src/app/models/account/login-model';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
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

model=new ContactModel();
  constructor(private comSrv: CommonService,  
    private acontSrv: AccountService,

  ) {
    this.currentUser=this.acontSrv.getCurrentUser();

   }

  ngOnInit(): void {
  }

  saveChanges(model:ContactModel)
  {
  
  }


}

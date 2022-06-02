import { Component, OnInit,Input } from '@angular/core';
import {  ProviderModel } from 'src/app/models/client/contact-model';
import { UserModel } from 'src/app/models/account/login-model';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-emergency-provider',
  templateUrl: './emergency-provider.component.html',
  styleUrls: [
    '../../../../assets/css/orange-blue.css',
    './emergency-provider.component.scss']
})
export class EmergencyProviderComponent implements OnInit {
  @Input() emergInfoTypeId:number;
  currentUser:UserModel;
  model=new ProviderModel();
  
  constructor(private comSrv: CommonService,  
    private acontSrv: AccountService,

  ) {
    this.currentUser=this.acontSrv.getCurrentUser();

   }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {  ProviderModel } from 'src/app/models/client/contact-model';
@Component({
  selector: 'app-emergency-provider',
  templateUrl: './emergency-provider.component.html',
  styleUrls: [
    '../../../../assets/css/orange-blue.css',
    './emergency-provider.component.scss']
})
export class EmergencyProviderComponent implements OnInit {

  model=new ProviderModel();
  
  constructor() { }

  ngOnInit(): void {
  }

}

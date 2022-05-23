import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/models/client/contact-model';
@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: [
    '../../../../assets/css/orange-blue.css',
    './emergency-contact.component.scss']
})
export class EmergencyContactComponent implements OnInit {

model=new ContactModel();
  constructor() { }

  ngOnInit(): void {
  }

}

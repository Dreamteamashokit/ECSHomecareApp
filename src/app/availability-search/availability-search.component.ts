import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client/client-model';
@Component({
  selector: 'app-availability-search',
  templateUrl: './availability-search.component.html',
  styleUrls: [
    '../../assets/css/orange-blue.css',
    './availability-search.component.scss']
})
export class AvailabilitySearchComponent implements OnInit {
  IsLoad: boolean = false;
  model = new ClientModel();
  constructor() { }

  ngOnInit(): void {
  }


  search()
  {
    
  }

}

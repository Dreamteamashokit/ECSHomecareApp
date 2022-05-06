import { Component, OnInit } from '@angular/core';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ItemsList } from 'src/app/models/common';
@Component({
  selector: 'app-emp-availability',
  templateUrl: './emp-availability.component.html',
  styleUrls: [
    
    '../../../assets/css/orange-blue.css',
    './emp-availability.component.scss']
})
export class EmpAvailabilityComponent implements OnInit {

  constructor(private empApi: EmployeeapiService) {
    
   }

  ngOnInit(): void {
    this.BindAvailability()
  }

  dataList = Array<ItemsList>();
    BindAvailability() {
    // this.IsLoad = true;

    this.empApi.getAvailabilityList().subscribe(response => {
      console.log(response.data);
    
      response.data.forEach((_obj: any) => {
        this.dataList.push(
          new ItemsList(_obj.availabilityId.toString(), _obj.availabilityName)
        );
      });
    });
  }

}

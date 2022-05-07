import { Component, OnInit } from '@angular/core';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { ItemsList } from 'src/app/models/common';
import { ActivatedRoute, Params } from '@angular/router';
import { EmpAvailablityMappingModel } from 'src/app/models/Employee/EmpAvailablityMappingModel';
@Component({
  selector: 'app-emp-availability',
  templateUrl: './emp-availability.component.html',
  styleUrls: [

    '../../../assets/css/orange-blue.css',
    './emp-availability.component.scss']
})
export class EmpAvailabilityComponent implements OnInit {

  clientId: number = 0;
  mappingList = new Array<EmpAvailablityMappingModel>();
  constructor(private empApi: EmployeeapiService, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        if (params["empId"] != null) {
          this.clientId = Number(params["empId"]);
        }
        else {
          this.clientId = Number(params["clientId"]);
        }
        this.BindAvailability();
      }
    );
    // this.BindAvailability()
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
  updateAvailablity() {
    debugger;
    this.mappingList.forEach(element => {
      this.empApi.saveAvailabilityMapping(element).subscribe((response) => {
        console.log(response);
      });
    });
  }
  onAvailabilityMappingChange(event: any, itmId: number) {
    debugger;
    if (event.target.checked) {
      // do something here
      var mappingObj = new EmpAvailablityMappingModel();
      mappingObj.empId = this.clientId;
      mappingObj.availbilityId = itmId;
      this.mappingList.push(mappingObj);
    }
  }
}



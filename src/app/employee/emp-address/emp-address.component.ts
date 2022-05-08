import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { Incident } from 'src/app/models/employee/incident';
import { AccountService } from 'src/app/services/account.service';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import { AddressObj } from 'src/app/models/employee/address';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emp-address',
  templateUrl: './emp-address.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-address.component.scss']
})
export class EmpAddressComponent implements OnInit {
  modalRef?: BsModalRef;

  model = new AddressObj();
  private http: HttpClient
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService, private empApi: EmployeeapiService) {
    setTheme('bs3');

  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        if (params["empId"] != null) {
          this.model.empId = Number(params["empId"]);
        }
        else {
          this.model.empId = Number(params["clientId"]);
        }

        this.getAddress(this.model.empId);
      }
    );

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  decline(): void {

    this.modalRef?.hide();
  }

  saveAddress() {
    debugger;
    this.model.empId = Number(this.model.empId);
    this.model.addressType = 1;
    
    const reqObj: AddressObj = this.model;
    reqObj.latitude=this.model.latitude.toString();
    reqObj.longitude=this.model.longitude.toString();
    reqObj.userId=this.model.empId;
    console.log('Search', reqObj);
    this.empApi.saveAddress(reqObj).subscribe((response) => {
      this.decline();
      this.getAddress(reqObj.empId);
    });
  }


  getAddress(empId: number) {
    this.empApi.geAddress(empId).subscribe((response) => {
      if (response.result) {
        this.model = response.data;
      }

      console.log("Address   :" + response.data);

    });
  }
  OnChangeAddress(model: AddressObj) {
    //var addr=event.target.value;
    debugger;
    this.empApi.getGeoPoint(model).subscribe((response) => {
      if (response.results.length > 0) {
        this.model.latitude = response.results[0].position.lat;
        this.model.longitude = response.results[0].position.lon;
      }
    },
      (err) => {
        this.model.latitude = "";
        this.model.longitude = "";
      }
    );
  }
}

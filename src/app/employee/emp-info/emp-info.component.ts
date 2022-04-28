import { Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
import { EmployeeapiService } from 'src/app/services/employeeapi.service'; 
import { EmployeeModel } from 'src/app/models/employee/employee-model';
import { EmployeeJson } from 'src/app/models/employee/employee-json';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { setTheme } from 'ngx-bootstrap/utils';

import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';


@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-info.component.scss']
})
export class EmpInfoComponent implements OnInit {
  modalRef?: BsModalRef;
  currentUser:UserModel;  

  empId : string = "-1";
  empInfo : EmployeeJson;
  UserData:any;
  currentDate  = new Date();
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "my-modal"
  };

  constructor(private router:Router, 
    private route:ActivatedRoute,
    public datepipe: DatePipe,
    private empapi : EmployeeapiService,       
    private accountApi: AccountService,    
    private modalService: BsModalService   
    ) 
    {
      this.currentUser=this.accountApi.getCurrentUser();
      setTheme('bs3');
    }

  ngOnInit(): void {

    this.route.params.subscribe((params : Params) =>{
        this.empId = params["empId"];
        this.empInfo = new EmployeeJson();
        this.GetEmployeeInfo(this.empId);

        this.UserData={
          id:this.empId,
          type:this.empInfo.empType
        };
      }
    );
  
  }

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  GetEmployeeInfo(empId : string)
  {
    this.empapi.getEmployeeInfo(empId).subscribe(response => {
          this.empInfo = response.data;
        
        }); 
  }

  getName(empInfo : EmployeeJson) : string
  {
    if(empInfo.lastName.length > 1)
    {
      return this.empInfo.lastName + ',' + this.empInfo.firstName;
    }
    else
    {
      return this.empInfo.firstName;
    }
  }
  formatPhoneNumber(phoneNumberString:string) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
  }



}

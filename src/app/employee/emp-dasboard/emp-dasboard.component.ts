import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';

import { Router,ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-emp-dasboard',
  templateUrl: './emp-dasboard.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',    
    './emp-dasboard.component.scss']
})
export class EmpDasboardComponent implements OnInit {
  empId : string = "-1";
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private empapi : EmployeeapiService,    
    private modalService: BsModalService   
    ) 
    {
      setTheme('bs3');
    }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params : Params) =>{
        this.empId = params["empId"];
      }
    );

  }

}

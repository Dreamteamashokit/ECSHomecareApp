import { Component, OnInit,ViewChild  } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  clientId : number= 0;
  modalRef?: BsModalRef;
  UserData:any;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  constructor(private router:Router, 
    private route:ActivatedRoute,  
    private modalService: BsModalService   
    ) 
    {
      setTheme('bs3');
    }





  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params : Params) =>{
        debugger;
        this.clientId = params["clientId"];
        this.UserData={
          id:this.clientId,
          type:'Client type'
        };
      }
    );
   
  }



  ngAfterViewInit(): void {
    this.route.params.subscribe((params : Params) =>{ 
      this.selectTab(Number(params["tabId"]));       
     });
  }



  selectTab(tabId: number) {
    
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }



}

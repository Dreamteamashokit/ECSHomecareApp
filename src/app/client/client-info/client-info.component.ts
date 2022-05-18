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
  constructor(private router:Router, 
    private route:ActivatedRoute,  
    private modalService: BsModalService   
    ) 
    {
      setTheme('bs3');

   
    }

    @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

    selectTab(tabId: number) {
      if (this.staticTabs?.tabs[tabId]) {
        this.staticTabs.tabs[tabId].active = true;
      }
    }
  UserData:any;
  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params : Params) =>{
        debugger;
        this.clientId = params["clientId"];
     

        let tab=Number(params["tabId"]);
        
       

        this.UserData={
          id:this.clientId,
          type:'Client type'
        };
      }
    );
   
  }


  ngAfterViewChecked() {
    this.route.params.subscribe((params : Params) =>{ 
       this.selectTab(Number(params["tabId"]));       
      });
  }

  ngAfterViewInit() {
  
  }







}

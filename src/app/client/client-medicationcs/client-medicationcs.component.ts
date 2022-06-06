import { Component, OnInit,TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import{ Medicationcs} from 'src/app/models/client/medicationcs-model';
import { UserModel } from 'src/app/models/account/login-model';
@Component({
  selector: 'app-client-medicationcs',
  templateUrl: './client-medicationcs.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './client-medicationcs.component.scss']
})
export class ClientMedicationcsComponent implements OnInit {
  modalRef?: BsModalRef;
  clientId:number;
  medicationList:Medicationcs[]=[];
  currentUser:UserModel;
  model=new Medicationcs();

  constructor(
    public datepipe: DatePipe,
    private accountApi: AccountService,
    private comApi: CommonService,
    private route:ActivatedRoute,
    private modalService: BsModalService,
     private clientapi : ClientApiService)
      { 
      setTheme('bs3');
     
    }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{   
        
        this.clientId = Number(params["clientId"]);   
        this.currentUser=this.accountApi.getCurrentUser();  
        this.model.startDate=new Date();
        this.model.selfAdministerCheck=true;
        this.model.frequencyText=0;
        this.getMedicationRecord();
      });
  }

  openModal(template: TemplateRef<any>) {    
    this.modalRef = this.modalService.show(template);
  }

  saveMedicationcs() {

      
    this.model.createdBy=this.currentUser.userId;
    this.model.clientID=Number(this.clientId);
    this.model.frequencyText=Number(this.model.frequencyText);
    this.model.remindersCheck=Boolean(this.model.remindersCheck);
    this.model.instructionsCheck=Boolean(this.model.instructionsCheck);
    this.model.administrationCheck=Boolean(this.model.administrationCheck);
    this.model.selfAdministerCheck=Boolean(this.model.selfAdministerCheck);

    this.clientapi.SaveMedicationcs(this.model).subscribe(Responce=>{      
      this.decline();
      this.getMedicationRecord();
     })

  }

  getMedicationRecord()
  {
    this.clientapi.getClientMedicationcsList(this.clientId).subscribe(response=>{
        
      this.medicationList=response.data;
    });
  }

  deleteMedicationData(medicationId:number)
  {
    let isOk = confirm("Are you sure to delete?");
    if(isOk)
    {
    this.clientapi.deleteMedicationcsRecord(medicationId,this.clientId).subscribe(response=>{   
      this.getMedicationRecord();
     })
    }
  }


  decline(): void {
  
    this.modalRef?.hide();
  }




  public formateDateTime(logTime:Date)
  {

   
   return this.datepipe.transform(logTime,"dd MMM YYYY");
  }






}

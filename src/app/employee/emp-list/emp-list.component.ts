import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeapiService } from 'src/app/services/employeeapi.service';

import { CommonService } from 'src/app/services/common.service';
import { ItemsList,MasterType ,SelectList} from 'src/app/models/common';
import { EmployeeList } from 'src/app/models/employee/employee-model';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import { ClientFilter,ClientResult} from 'src/app/models/meeting/client-meeting';
import { Usertype } from 'src/app/commanHelper/usertype';
@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    
    './emp-list.component.scss']
})
export class EmpListComponent implements OnInit {
  IsLoad: boolean = false;
  currentUser:UserModel;
 

  searchValue = "";
  public currentAlpha:string="All";

  statusData: ItemsList[];
  empTypeList: ItemsList[] = [];
  managerList: ItemsList[];
  stateList: SelectList[];

  empList: EmployeeList[];
  currentList: EmployeeList[];
  objModel=new ClientFilter(0,"",0,0,0);
 
  resultText:string='';

  pageIndex: number = 1;
  totalItemsCount : number = 0;

  search?: string;
  suggestions$?: any;
  errorMessage?: string;

  constructor(private router: Router,
     private empapi: EmployeeapiService,
    private accountApi: AccountService,
    private comApi: CommonService) {

    this.currentUser=this.accountApi.getCurrentUser();
    if(this.currentUser.userId>0)
    {
      this.BindEmployee(this.currentUser.userId);
    }
    this.objModel.empType=0;
    
  }

  ngOnInit(): void {
  
  }

  BindEmployee(userId:number)
  {
     this.IsLoad = true;
    this.empapi.getEmployeeListObj(userId).subscribe(response => {
      this.empList=this.currentList=  response.data;
      this.totalItemsCount=  this.empList.length;
      this.IsLoad = false;
    });

    this.comApi.getMaster(MasterType.Status).subscribe((response) => {
      this.statusData = response.data;
    });
	 this.comApi.getEmpTypeList().subscribe((response) => {
      this.empTypeList = response.data;
    });
    this.comApi.getUsers(Usertype.Coordinators).subscribe((response) => {
      this.managerList = response.data;
    });


    this.comApi.getStateList('USA').subscribe((response) => {
      this.stateList = response.data;
    });

  }

  OnChangeType(type: any) {
   debugger;
    if (type == '0') {
      this.empList = this.currentList;
    }
    else {
      var result = this.currentList.filter(o => o.typeId == type);
      this.empList = result;
    }
  }

  OnChangeStatus(_status: any) {
 
     if (_status == '0') {
       this.empList = this.currentList;
     }
     else {
       var result = this.currentList.filter(o => o.empStatus == _status);
       this.empList = result;
     }
 
   }
   OnChangeManager(_md: any) {

     if (_md == '0') {
       this.empList = this.currentList;
     }
     else {
       var result = this.currentList.filter(o => o.managerId == _md);
       this.empList = result;
     }
 
   }


   getFilterData(model: ClientFilter) {

    this.IsLoad = true;
    console.log(this.statusData);
    model.empType=Number(model.empType);
    model.status=Number(model.status);
    model.coordinator=Number(model.coordinator);
    model.payer=Number(model.payer);
    let resultText= '';
    if(model.empType!=0)
    {    
      const result = this.empTypeList.find(x => x.itemId === model.empType);
     resultText+= 'Type :'+ result ?.itemName + ", ";    
    }
    if(model.status!=0)
    {    
      const result = this.statusData.find(x => x.itemId === model.status);
     resultText+= 'Status :'+ result ?.itemName + ", ";    
    }
    if(model.coordinator!=0)
    {  
      const result = this.managerList.find(x => x.itemId === model.coordinator);
      resultText+= 'Coordinator :'+ result ?.itemName + ", ";
    }
  
    if(model.state!="")
    {
      const result = this.stateList.find(x => x.itemCode === model.state);
      resultText+= 'State :'+ result ?.itemName + ", ";  
    }    
    this.resultText=resultText; 
    this.empapi.getEmpListObj(this.objModel).subscribe({ 
      next: (response) => {
        if(response.result)
        {       
          this.empList= response.data;
          this.totalItemsCount=response.data.length;         
        }
        else
        {
          this.empList=[];
          this.totalItemsCount=0;       
        }        
      }, 
      error: (err) => { 
        console.log(err);   
        this.empList=[];
        this.totalItemsCount=0;  
      }, 
      complete: () => { this.IsLoad = false;
      }
    });    

  }  


  AlphaFilter(alpha:any){
    this.currentAlpha=alpha;
    if (alpha == 'All') {
      this.empList = this.currentList;
      this.totalItemsCount=  this.empList.length;
    }
    else {
      var result = this.currentList.
       filter(o => o.empName
      .substring(0,1).toLowerCase()===alpha.toLowerCase());
      this.empList = result;
      this.totalItemsCount=  this.empList.length;
    }

  }













  delEmployee(params: any) {
    debugger;
    this.empapi.deleteEmployee(params.empId).subscribe(response => {

      let remaining = this.currentList.filter(
        (res: any) => res.empId != params.empId
      );      
      this.currentList= remaining;
      this.empList = this.currentList;
      this.totalItemsCount=  this.empList.length;
    });
  }


  pageChanged(event : any){
    this.pageIndex = event;
  }










}

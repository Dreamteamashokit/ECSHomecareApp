import { Component, OnInit } from '@angular/core';
import { AccountUserModel } from 'src/app/models/account/account-model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';
import { SelectList} from 'src/app/models/common';
import { UserModel } from 'src/app/models/account/login-model';
import { UserType } from 'src/app/models/common';
import { DatePipe } from '@angular/common';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    
    './create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  IsLoad: boolean = false;
  currentUser:UserModel;
  model = new AccountUserModel();
   stateList: SelectList[] = [];
  userList = Array<AccountUserModel>();

  IsChecked: boolean;


  constructor(private router:Router, 
    private comSrv: CommonService,
    private accntSrv: AccountService,
    private toastr: ToastrManager
    ) 
    {
      this.currentUser=this.accntSrv.getCurrentUser();
      this.BindMaster();
      this.getUserList(3);
      this. model.homeAddress.state="";

     }

  ngOnInit(): void {
  }




  BindMaster()
  {
    this.comSrv.getStateList('USA').subscribe((response) => {
      this.stateList = response.data;
    });
  }

  saveChanges() {
    debugger;

    if(this.IsChecked)
    {
      this.model.userType=3;
      this.IsLoad = true;
      this.model.isActive=1; 
      this.model.createdBy=this.currentUser.userId;

      const reqObj: AccountUserModel = this.model;
      console.log('Search', reqObj);
      this.accntSrv.addUser(reqObj).subscribe((response) => {

        this.getUserList(reqObj.userType);
     
      });
    }
    else
    {
      this.toastr.infoToastr("Select Checkbox!", 'Info!');
      //alert("Select Checkbox");
    }
 
  
  }


 


  getUserList(userType : number) {
    this.accntSrv.getUserList(userType).subscribe((response) => {
      this.userList = response.data;
      console.log(response);
      this.IsLoad = false;
    });
  }












}

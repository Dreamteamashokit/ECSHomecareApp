import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginModel, UserModel } from 'src/app/models/account/login-model';
import{ AppSettings,Location } from 'src/app/common/appSettings';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  IsLoad: boolean = false;
  model = new LoginModel();
  authObj=new UserModel();
  constructor(private router:Router, private accountApi : AccountService) {

    this.authObj.latitude=Location.latitude;
    this.authObj.longitude= Location.longitude;

   }

  ngOnInit(): void {
  }

  signIn(userName:string,password:string){

    this.IsLoad=true;
    this.model.userName=userName;
    this.model.password=password;  

  this.accountApi.signIn(this.model).subscribe(  {  
     
    next: (response) => {  
 
      if(response.result)
      {
      
        this.authObj.loginInId=response.data.loginInId;
        this.authObj.userId=response.data.userId;
        this.authObj.userName=response.data.userName;
        this.authObj.email=response.data.email;
        this.authObj.userTypeId=response.data.userTypeId;
      
        if (navigator.geolocation) 
        {
          navigator.geolocation.getCurrentPosition((position:any) => {
          if (position) {   
            this.authObj.latitude=Number(position.coords.latitude);
            this.authObj.longitude=   Number(position.coords.longitude);        
          }
        },
        (error: any) =>
          {
            console.log(error);      
        
           }
          );
         }      

        this.accountApi.setCurrentUser(this.authObj);
   
        this.router.navigate(['/dashboard']);
      }
      else{

        alert('Login credentials are not correct.');
      }

     },
     error: (err) => {     
      alert("Some technical issue exist, Please contact to admin !");
     console.log(err);
    },   
    complete: () => { 


      this.IsLoad=false;
    }
});




        
  }

}

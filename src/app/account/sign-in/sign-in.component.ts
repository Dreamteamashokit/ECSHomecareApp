import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoginModel } from 'src/app/models/account/login-model';

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
  constructor(private router:Router, private accountApi : AccountService) { }

  ngOnInit(): void {
  }

  signIn(userName:string,password:string){

    this.IsLoad=true;

    this.model.userName=userName;
    this.model.password=password;   
    this.accountApi.signIn(this.model).subscribe((response) => {


      
      if(response.result)
      {

        this.accountApi.setCurrentUser(response.data);
        // localStorage.setItem('userData', JSON.stringify(response.data));
        this.router.navigate(['/dashboard']);
      }
      else{
        this.IsLoad=false;
        alert('Login credentials are not correct.');
      }
     
    });
        
  }

}

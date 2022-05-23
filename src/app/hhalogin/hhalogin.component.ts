import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Externalsign } from 'src/app/models/account/login-model';

@Component({
  selector: 'app-hhalogin',
  templateUrl: './hhalogin.component.html',
  styleUrls: ['./hhalogin.component.scss']
})
export class HHALoginComponent implements OnInit {
  IsLoad: boolean = false;
  model = new Externalsign();

  constructor(private router:Router,private accountApi : AccountService) { 

  }

  ngOnInit(): void {

  }


  ExternalsignIn(SSN:string){

    this.IsLoad=true;
    this.model.SSN=SSN;  

    this.accountApi.ExternalsignIn(this.model).subscribe((response) => {
      if(response.result)
      {
        debugger;
        this.accountApi.setHHAUser(response.data);
        this.router.navigate(['/hhaportal']);
      }
      else{
        this.IsLoad=false;
        alert('Login credentials are not correct.');
      }
    });     
  }
}

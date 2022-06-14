import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Externalsign } from 'src/app/models/account/login-model';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-hhalogin',
  templateUrl: './hhalogin.component.html',
  styleUrls: ['./hhalogin.component.scss']
})
export class HHALoginComponent implements OnInit {
  IsLoad: boolean = false;
  model = new Externalsign();

  constructor(private router:Router,private accountApi : AccountService, private toastr: ToastrManager) { 

  }

  ngOnInit(): void {

  }


  ExternalsignIn(SSN:string){

    this.IsLoad=true;
    this.model.SSN = SSN;

    this.accountApi.ExternalsignIn(this.model).subscribe((response) => {
      
      if(response != null && response != undefined && response.result && response.data != null && response.data != undefined)
      {
        this.accountApi.setHHAUser(response.data);
        this.router.navigate(['/hhaportal']);
      }
      else{
        this.IsLoad=false;
        //alert('Login credentials are not correct.');
        this.toastr.infoToastr("Login credentials are not correct.", 'Info!');

      }
    });     
  }
}

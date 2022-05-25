import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { HHAClockInMode } from '../models/account/login-model';

@Component({
  selector: 'app-clockinout',
  templateUrl: './clockinout.component.html',
  styleUrls: ['./clockinout.component.scss']
})
export class ClockinoutComponent implements OnInit {

  UserId:number;
  model = new HHAClockInMode();

  constructor(private _accountService:AccountService,
    private router:Router) { }

  ngOnInit(): void {
    var objUser = this._accountService.GetCurrentHHAUser();
    if(objUser != null && objUser != undefined){
      this.UserId = objUser.userId;
    }
  }

  HHAClockIn(Notes:string,Type:number){
    this.model.userId = this.UserId;
    this.model.Notes = Notes;  
    this.model.Type = Type;
    this._accountService.HHAClockIn(this.model).subscribe((response) => {
      if(response.result)
      {
        if(Type == 2){
          this.router.navigate(['/hhapatinet']);
          alert('HHA User clock out successfull.');
        }
        else{
          alert('HHA User clock in successfull.');
        }
      }
      else{
        alert('HHA User does not exists.');
      }
    });     
  }


}

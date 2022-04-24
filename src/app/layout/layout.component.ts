import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginModel,UserModel } from 'src/app/models/account/login-model';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [
    '../../assets/css/orange-blue.css',
    '../../assets/css/style-responsive.css',  
    './layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUser:UserModel;

  navbarCollapsed = true;
  public modalRef: BsModalRef;
  userId:number;
  constructor(private modalService: BsModalService,
    private router:Router, 
    private accountApi : AccountService) {

      this.currentUser=this.accountApi.getCurrentUser();
console.log(this.currentUser);

    }

  ngOnInit(): void {
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
}
logOut()
{
  debugger;
 let obj= this.accountApi.getCurrentUser();
  this.accountApi.signOut(obj.userId).subscribe((response) => {

    if(response.data)
    {
      this.router.navigate(['/login']);
    }
 
  });

}

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from 'src/app/account/sign-in/sign-in.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewEmployeeComponent  } from './employee/new-employee/new-employee.component';
import { EmpListComponent  } from 'src/app/employee/emp-list/emp-list.component';
import { EmpInfoComponent } from 'src/app/employee/emp-info/emp-info.component';

import { MaincontentComponent } from './dashboard/maincontent/maincontent.component';
import { EmployeelistComponent } from './dashboard/employee/employeelist/employeelist.component';
import { ClientlistComponent } from './dashboard/client/clientlist/clientlist.component';
import { SaveemployeeComponent } from './dashboard/employee/saveemployee/saveemployee.component';
import { SaveclientComponent } from './dashboard/client/saveclient/saveclient.component';
import { ClienteventComponent } from './dashboard/client/clientevent/clientevent.component';
import { GenerateinvoiceComponent } from './dashboard/generateinvoice/generateinvoice.component';
import { GetinvoicesComponent } from './dashboard/getinvoices/getinvoices.component';
import { InvoicedetailsComponent } from './dashboard/invoicedetails/invoicedetails.component';
import { ClientInfoComponent } from './dashboard/client/client-info/client-info.component';
import { EmployeeInfoComponent } from './dashboard/employee/employee-info/employee-info.component';
import { ClientCalenderComponent } from './client-calender/client-calender.component';
import { MasterinfoComponent  } from './admin/master/masterinfo/masterinfo.component';



const routes: Routes = [
// {
//   path : 'Layout',component : LayoutComponent ,
//    children : [{path:'mastertype',component:CreateComponent}]
// },
// { path: '', component: SignInComponent },
// { path: '**', component: SignInComponent },

{path : 'login',component : SignInComponent },
{path : 'dashboard',component :  LayoutComponent,
children : [{path:'',component:DashboardComponent}]},
{path : 'employee/create',component : LayoutComponent,
children : [{path:'',component:NewEmployeeComponent}]},
{path : 'employee/List',component : LayoutComponent,
children : [{path:'',component:EmpListComponent}]},
{path : 'employee/info/:eId',component : LayoutComponent,
  children : [{path:'',component:EmpInfoComponent}]},




// { path: 'employee/create', component: NewEmployeeComponent },


//   { 
//     path: '', 
//     component: LayoutComponent,
//     children: [
     
//       { path: 'masterinfo', component: MasterinfoComponent }
//     ]
// },




// { 
//   path: '', 
//   component: LayoutComponent,
//   children: [
   
//     { path: 'newEmp', component: NewEmployeeComponent }
//   ]
// },



  
 
  // {
  //   path : 'CalList',component : ClientCalenderComponent 
  // },

  // // {
  // //   path : 'Layout',component : LayoutComponent 
   
  // // },


  // {
  //   path : 'employee',component : LayoutComponent ,
  //    children : [{path:'',component:SaveemployeeComponent}]
  // },
  // {
  //   path : 'employeeList',component : LayoutComponent ,
  //    children : [{path:'',component:EmployeelistComponent}]
  // },
  // {
  //   path : 'Layout',component : LayoutComponent ,
  //    children : [{path:'employeeinfo/:eId',component:EmployeeInfoComponent}]
  // },
  // {
  //   path : 'Layout',component : LayoutComponent,
  //    children : [{path:'generateinvoice',component:GenerateinvoiceComponent}]
  // },
  // {
  //   path : 'Layout',component : LayoutComponent,
  //    children : [{path:'getinvoicelist',component:GetinvoicesComponent}]
  // },
  // {
  //   path : 'Layout',component : LayoutComponent ,
  //    children : [{path:'getinvoicebyId/:InvId',component:InvoicedetailsComponent}]
  // },
  // {
  //   path : 'Layout',component : LayoutComponent ,
  //    children : [{path:'clientevent/:clientId',component:ClienteventComponent}]
  // },
  
  // {
  //   path : 'Layout',component : LayoutComponent ,
  //    children : [{path:'clientlist',component:ClientlistComponent}]
  // },
  // {
  //   path : 'Layout',component : LayoutComponent ,
  //    children : [{path:'clientinfo/:cId',component:ClientInfoComponent}]
  // },
  
  // {
  //   path : 'Layout',component : LayoutComponent ,
  //    children : [{path:'saveclient',component:SaveclientComponent}]
  // }, 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

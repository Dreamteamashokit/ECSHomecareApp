import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterinfoComponent } from './admin/master/masterinfo/masterinfo.component';
import { SignInComponent } from 'src/app/account/sign-in/sign-in.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { EmpListComponent } from 'src/app/employee/emp-list/emp-list.component';
import { EmpInfoComponent } from 'src/app/employee/emp-info/emp-info.component';
import { EmpScheduleComponent } from 'src/app/meeting/emp-schedule/emp-schedule.component';
import { NewClientComponent } from 'src/app/client/new-client/new-client.component';
import { ClientListComponent } from 'src/app/client/client-list/client-list.component';
import { ClientScheduleComponent } from 'src/app/meeting/client-schedule/client-schedule.component';
import { ClientInfoComponent } from 'src/app/client/client-info/client-info.component';
//import { ClientlistComponent } from './dashboard/client/clientlist/clientlist.component';
import { GenerateinvoiceComponent } from './dashboard/generateinvoice/generateinvoice.component';
import { GetinvoicesComponent } from './dashboard/getinvoices/getinvoices.component';
import { InvoicedetailsComponent } from './dashboard/invoicedetails/invoicedetails.component';
import { TaskMasterComponent } from 'src/app/company/task-master/task-master.component';
import { AvailabilitySearchComponent } from 'src/app/common/availability-search/availability-search.component';


const routes: Routes = [

  { path: 'login', component: SignInComponent },
  {
    path: 'admin/master/create', component: LayoutComponent,
    children: [{ path: '', component: MasterinfoComponent }]
  },
  {
    path: 'dashboard', component: LayoutComponent,
    children: [{ path: '', component: DashboardComponent }]
  },
  {
    path: 'employee/create', component: LayoutComponent,
    children: [{ path: '', component: NewEmployeeComponent }]
  },
  {
    path: 'employee/list', component: LayoutComponent,
    children: [{ path: '', component: EmpListComponent }]
  },
  {
    path: 'employee/info/:empId', component: LayoutComponent,
    children: [{ path: '', component: EmpInfoComponent }]
  },
  {
    path: 'employee/schedule/:empId/:fromDate', component: LayoutComponent,
    children: [{ path: '', component: EmpScheduleComponent }]
  },
  {
    path: 'client/create', component: LayoutComponent,
    children: [{ path: '', component: NewClientComponent }]
  },
  {
    path: 'client/list', component: LayoutComponent,
    children: [{ path: '', component: ClientListComponent }]
  },
  {
    path: 'client/schedule/:clientId', component: LayoutComponent,
    children: [{ path: '', component: ClientScheduleComponent }]
  },
  {
    path: 'client/info/:clientId', component: LayoutComponent,
    children: [{ path: '', component: ClientInfoComponent }]
  },
  {
    path: 'invoice/create', component: LayoutComponent,
    children: [{ path: '', component: GenerateinvoiceComponent }]
  },
  {
    path: 'invoice/list', component: LayoutComponent,
    children: [{ path: '', component: GetinvoicesComponent }]
  },
  {
    path: 'invoice/info/:InvId', component: LayoutComponent,
    children: [{ path: '', component: InvoicedetailsComponent }]
  },

  {
    path: 'company/task', component: LayoutComponent,
    children: [{ path: '', component: TaskMasterComponent }]
  },

  {
    path: 'availability', component: LayoutComponent,
    children: [{ path: '', component: AvailabilitySearchComponent }]
  },







  { path: '', component: SignInComponent },
  { path: '**', component: SignInComponent },



  // {path : 'client/info/:eId',component : LayoutComponent,
  // children : [{path:'',component:EmpInfoComponent}]},
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

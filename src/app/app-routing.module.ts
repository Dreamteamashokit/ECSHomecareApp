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
import { ClientInfoComponent } from 'src/app/client/client-info/client-info.component';
import { GenerateinvoiceComponent } from './dashboard/generateinvoice/generateinvoice.component';
import { GetinvoicesComponent } from './dashboard/getinvoices/getinvoices.component';
import { InvoicedetailsComponent } from './dashboard/invoicedetails/invoicedetails.component';
import { TaskMasterComponent } from 'src/app/common/task-master/task-master.component';
import { AvailabilitySearchComponent } from 'src/app/common/availability-search/availability-search.component';
import { ClockinoutComponent } from './clockinout/clockinout.component';
import { HHALoginComponent } from './hhalogin/hhalogin.component';
import { HhaportalComponent } from './hhaportal/hhaportal.component';
import { PatientComponent } from './patient/patient.component';
import { MeetingDetailComponent } from './meeting/meeting-detail/meeting-detail.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

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
    path: 'employee/info/:empId/:tabId', component: LayoutComponent,
    children: [{ path: '', component: EmpInfoComponent }]
  },
  {
    path: 'user/schedule/:typeId/:userId/:fromDate', component: LayoutComponent,
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
  // {
  //   path: 'client/schedule/:clientId/:fromDate', component: LayoutComponent,
  //   children: [{ path: '', component: ClientScheduleComponent }]
  // },
  {
    path: 'client/info/:clientId/:tabId', component: LayoutComponent,
    children: [{ path: '', component: ClientInfoComponent }]
  },
  {
    path: 'appointMent/info/:meetingId', component: LayoutComponent,
    children: [{ path: '', component: MeetingDetailComponent }]
  },
  {
    path: 'invoice/create', component: LayoutComponent,
    children: [{ path: '', component: GenerateinvoiceComponent }]
  },
  //{
  //  path: 'invoice/list', component: LayoutComponent,
  //  children: [{ path: '', component: GetinvoicesComponent }]
  //},
  {
    path: 'invoice/info/:InvId', component: LayoutComponent,
    children: [{ path: '', component: InvoicedetailsComponent }]
  },
  {
    path: 'common/task', component: LayoutComponent,
    children: [{ path: '', component: TaskMasterComponent }]
  },
  {
    path: 'availability', component: LayoutComponent,
    children: [{ path: '', component: AvailabilitySearchComponent }]
  },
  {
    path:'clockinout',component:LayoutComponent,
    children:[{path:'',component:ClockinoutComponent}]
  },
  {
    path:'hhalogin',component:LayoutComponent,
    children:[{path:'',component:HHALoginComponent}]
  },
  {
    path:'hhaportal',component:LayoutComponent,
    children:[{path:'',component:HhaportalComponent}]
  },
  {
    path:'hhapatinet',component:LayoutComponent,
    children:[{path:'',component:PatientComponent}]
  },
  {
    path: 'user/create', component: LayoutComponent,
    children: [{ path: '', component: CreateUserComponent }]
  },
  {
    path: 'billing', loadChildren: () => import('src/app/billing/billing.module').then(m => m.BillingModule) 
  },
  { path: '', component: SignInComponent },
  { path: '**', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

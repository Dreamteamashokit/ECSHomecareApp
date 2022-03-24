import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService } from './auth-guard.service';
import { AgGridModule } from 'ag-grid-angular';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { ClientComponent } from './dashboard/client/client.component';
import { ClientlistComponent } from './dashboard/client/clientlist/clientlist.component';
import { SaveclientComponent } from './dashboard/client/saveclient/saveclient.component';
import { ClienteventComponent } from './dashboard/client/clientevent/clientevent.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { EmployeelistComponent } from './dashboard/employee/employeelist/employeelist.component';
import { SaveemployeeComponent } from './dashboard/employee/saveemployee/saveemployee.component';
import { MaincontentComponent } from './dashboard/maincontent/maincontent.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { GenerateinvoiceComponent } from './dashboard/generateinvoice/generateinvoice.component';
import { GetinvoicesComponent } from './dashboard/getinvoices/getinvoices.component';
import { InvoicedetailsComponent } from './dashboard/invoicedetails/invoicedetails.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientInfoComponent } from './dashboard/client/client-info/client-info.component';
import { EmployeeInfoComponent } from './dashboard/employee/employee-info/employee-info.component';
import { LayoutComponent } from './layout/layout.component';
import { ClientCalenderComponent,ChunkPipe } from './client-calender/client-calender.component';
import { FilterPipe } from './dashboard/employee/employeelist/filter.pipe';
import { AppBootstrapModule } from "../app/app-bootstrap/app-bootstrap.module";
import { TestingComponent } from './testing/testing.component';

import { TabsModule} from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmpIncidentsComponent } from './employee/emp-incidents/emp-incidents.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { EmpAttendanceComponent } from './employee/emp-attendance/emp-attendance.component';
import { EmpAvailabilityComponent } from './employee/emp-availability/emp-availability.component';
import { EmpStatusComponent } from './employee/emp-status/emp-status.component';
import { ScheduleComponent } from './meeting/schedule/schedule.component';
import { EmpAddressComponent } from './employee/emp-address/emp-address.component';
import { EmpComplianceComponent } from './employee/emp-compliance/emp-compliance.component';
import { EmpRateComponent } from './employee/emp-rate/emp-rate.component';
import { EmpDeclinedCasesComponent } from './employee/emp-declined-cases/emp-declined-cases.component';
import { UploadComponent } from './Document/upload/upload.component';


FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin
]);
 
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ClientComponent,
    ClientlistComponent,
    SaveclientComponent,
    ClienteventComponent,
    EmployeeComponent,
    EmployeelistComponent,
    SaveemployeeComponent,
    MaincontentComponent,
    GenerateinvoiceComponent,
    GetinvoicesComponent,
    InvoicedetailsComponent,
    ClientInfoComponent,
    EmployeeInfoComponent,
    LayoutComponent,
    ClientCalenderComponent,
    ChunkPipe,
    FilterPipe,
    TestingComponent,
    EmpIncidentsComponent,
    EmpAttendanceComponent,
    EmpStatusComponent,    
    ScheduleComponent,
         EmpAvailabilityComponent,
         EmpAddressComponent,    
         EmpComplianceComponent, EmpRateComponent, EmpDeclinedCasesComponent, UploadComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    FullCalendarModule,
    AppRoutingModule,
    MatTableModule,
    AgGridModule.withComponents([]),
    ToastrModule.forRoot(),
    FormsModule,
    AppBootstrapModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(), 
    TimepickerModule.forRoot()
  ],
  providers: [AuthGuardService, DatePipe,BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }

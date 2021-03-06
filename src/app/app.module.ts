import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe,HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AuthGuardService } from './auth-guard.service';

import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBootstrapModule } from "../app/app-bootstrap/app-bootstrap.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { SignaturePadModule } from 'angular2-signaturepad';


import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';

import { SignInComponent } from './account/sign-in/sign-in.component';

import { SystemMasterComponent } from './admin/master/system-master/system-master.component';
import { MasterinfoComponent } from './admin/master/masterinfo/masterinfo.component';
import { MasterTypeComponent } from './admin/master/master-type/master-type.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerateinvoiceComponent } from './dashboard/generateinvoice/generateinvoice.component';
import { GetinvoicesComponent } from './dashboard/getinvoices/getinvoices.component';
import { InvoicedetailsComponent } from './dashboard/invoicedetails/invoicedetails.component';

import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { EmpListComponent } from './employee/emp-list/emp-list.component';
import { EmpIncidentsComponent } from './employee/emp-incidents/emp-incidents.component';
import { EmpAttendanceComponent } from './employee/emp-attendance/emp-attendance.component';
import { EmpAvailabilityComponent } from './employee/emp-availability/emp-availability.component';
import { EmpStatusComponent } from './employee/emp-status/emp-status.component';
import { EmpAddressComponent } from './employee/emp-address/emp-address.component';
import { EmpComplianceComponent } from './employee/emp-compliance/emp-compliance.component';
import { EmpRateComponent } from './employee/emp-rate/emp-rate.component';
import { EmpDeclinedCasesComponent } from './employee/emp-declined-cases/emp-declined-cases.component';
import { EmpInfoComponent } from './employee/emp-info/emp-info.component';
import { EmpDasboardComponent } from './employee/emp-dasboard/emp-dasboard.component';

import { EmpDocumentComponent } from './employee/emp-document/emp-document.component';
import { ScheduleComponent } from './meeting/schedule/schedule.component';
import { EmpScheduleComponent } from './meeting/emp-schedule/emp-schedule.component';

import { UserScheduleComponent } from './meeting/user-schedule/user-schedule.component';
import { MeetingDetailComponent } from './meeting/meeting-detail/meeting-detail.component';
import { NewClientComponent } from 'src/app/client/new-client/new-client.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientDashboardComponent } from 'src/app/client/client-dashboard/client-dashboard.component';
import { ClientInfoComponent } from 'src/app/client/client-info/client-info.component';
import { GeneralClientComponent } from 'src/app/client/general-client/general-client.component';
import { ClientStatusComponent } from 'src/app/client/client-status/client-status.component';
import { TaskMasterComponent } from './common/task-master/task-master.component';
import { ServiceTaskComponent } from './client/service-task/service-task.component';
import { ClientMedicationcsComponent } from './client/client-medicationcs/client-medicationcs.component';
import { DeclinedEmpComponent } from './client/declined-emp/declined-emp.component';
import {ClientEmergencyInfoComponent} from './client/client-emergency-info/client-emergency-info.component';
import { OtherInformationComponent } from './client/other-information/other-information.component';
import { DiagnosisComponent } from './client/diagnosis/diagnosis.component';
import { DiagnosisMasterComponent } from './master/diagnosis-master/diagnosis-master.component'
import { ClientContactlogListComponent } from './client/client-contactlog-list/client-contactlog-list.component';
import { ClientNoteComponent } from './client/client-note/client-note.component';
import { ClientCommunityComponent } from './client/client-community/client-community.component';
import { AddLocationComponent } from './admin/add-location/add-location.component'
import { ClientProvisionsComponent } from './client/client-provisions/client-provisions.component';
import { AvailabilitySearchComponent } from 'src/app/common/availability-search/availability-search.component';
import { ClientBillingComponent } from './client/client-billing/client-billing.component';
import { LocationMapComponent } from './shared/common/location-map/location-map.component';
import { SearchAvailbilityComponent } from './shared/common/search-availbility/search-availbility.component';
import { ClockinoutComponent } from './clockinout/clockinout.component';
import { HHALoginComponent } from './hhalogin/hhalogin.component';
import { HhaportalComponent } from './hhaportal/hhaportal.component';
import { PatientComponent } from './patient/patient.component';
import { EmergencyContactComponent } from './shared/common/emergency-contact/emergency-contact.component';
import { EmergencyProviderComponent } from './shared/common/emergency-provider/emergency-provider.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserDetailComponent } from './shared/user-detail/user-detail.component';
import { UpcommingComponent } from './meeting/shared/upcomming/upcomming.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComplianceCategoryComponent } from './common/compliance-category/compliance-category.component';
import { DocumentComponent } from './common/document/document.component';
import { EquateDatePipe, ChunkPipe } from './pipe/equate-date-pipe.pipe';
import { EnumToArrayPipe } from './pipe/enum-to-array.pipe';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GenerateinvoiceComponent,
    GetinvoicesComponent,
    InvoicedetailsComponent,
    ClientInfoComponent,
    LayoutComponent,
    EmpIncidentsComponent,
    EmpAttendanceComponent,
    EmpStatusComponent,
    ScheduleComponent,
    EmpAvailabilityComponent,
    EmpAddressComponent,
    EmpComplianceComponent,
    EmpRateComponent,
    EmpDeclinedCasesComponent,
    SystemMasterComponent,
    MasterinfoComponent,
    MasterTypeComponent,
    NewEmployeeComponent,
    LoaderComponent,
    NewClientComponent,
    EmpListComponent,
    ClientListComponent,
    EquateDatePipe,
    ChunkPipe,
    MeetingDetailComponent,
    SignInComponent,
    EmpInfoComponent,
    EmpDasboardComponent,
    EmpScheduleComponent,
    EmpDocumentComponent,
    ClientDashboardComponent,
    UserScheduleComponent,
    GeneralClientComponent,
    ClientStatusComponent,
    ClientMedicationcsComponent,  
    ServiceTaskComponent, 
    DeclinedEmpComponent, 
    ClientEmergencyInfoComponent,
    ClientContactlogListComponent,
    OtherInformationComponent,
    DiagnosisComponent,
    DiagnosisMasterComponent,
    TaskMasterComponent,
    ServiceTaskComponent, 
    DeclinedEmpComponent,  
    ClientContactlogListComponent, 
    ClientNoteComponent, 
    ClientCommunityComponent, 
    ClientProvisionsComponent,
    AddLocationComponent,
    ServiceTaskComponent, 
    DeclinedEmpComponent,  
    ClientContactlogListComponent, 
    ClientNoteComponent, 
    ClientCommunityComponent, 
    ClientBillingComponent, 
    AvailabilitySearchComponent, 
    LocationMapComponent, 
    SearchAvailbilityComponent, 
    ClockinoutComponent,
     HHALoginComponent
    , HhaportalComponent,
     PatientComponent,  
    SearchAvailbilityComponent,
     EmergencyContactComponent, 
    EmergencyProviderComponent, 
    CreateUserComponent, 
    UserDetailComponent, 
    UpcommingComponent,
     ComplianceCategoryComponent,
     DocumentComponent,
     EnumToArrayPipe,  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    AppBootstrapModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    SignaturePadModule,
    NgSelectModule,
  ],
 
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},AuthGuardService, DatePipe,BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }

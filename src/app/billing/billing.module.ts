import { NgModule } from '@angular/core';
import { LoaderComponent } from 'src/app/loader/loader.component';
import { CommonModule,DatePipe } from '@angular/common';
import { BillingComponent } from './billing.component';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AddRateComponent } from './component/manage_payer_and_rate/add-rate/add-rate.component';
import { GetinvoicesComponent } from '../dashboard/getinvoices/getinvoices.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PayerrateComponent } from './payerrate/payerrate.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';


const routes: Routes = [

    {
        path: '', component: LayoutComponent, children: [
            { path: '', component: PayerrateComponent },
            { path: 'pos', component: GetinvoicesComponent },
            { path: 'add-rate', component: AddRateComponent },
            { path: 'billing-shedule', component: CreateInvoiceComponent }
        ]
    }
]

@NgModule({
    declarations: [
   
        BillingComponent,
        AddRateComponent,
        PayerrateComponent,
        CreateInvoiceComponent
    ],
    imports: [
   
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        BsDatepickerModule.forRoot(),
    ],
    providers: [DatePipe],
})
export class BillingModule { }

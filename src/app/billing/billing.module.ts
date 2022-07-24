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
import { AddPayerComponent } from './component/manage_payer_and_rate/add-payer/add-payer.component';


const routes: Routes = [

    {
        path: '', component: LayoutComponent, children: [
            { path: '', component: AddPayerComponent },
            { path: 'pos', component: GetinvoicesComponent },
            { path: 'add-rate', component: AddRateComponent },
            { path: 'add-payer', component: AddPayerComponent },
            {path: 'add-payer/:payerId', component: AddRateComponent},
            { path: 'billing-shedule', component: CreateInvoiceComponent }
        ]
    }
]

@NgModule({
    declarations: [
   
        BillingComponent,
        AddRateComponent,
        PayerrateComponent,
        CreateInvoiceComponent,
        AddPayerComponent
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

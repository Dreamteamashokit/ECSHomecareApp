import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './billing.component';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AddRateComponent } from './component/manage_payer_and_rate/add-rate/add-rate.component';
import { GetinvoicesComponent } from '../dashboard/getinvoices/getinvoices.component';
import { FormsModule } from '@angular/forms';




const routes: Routes = [

    {
        path: '', component: LayoutComponent, children: [
            { path: '', component: GetinvoicesComponent },
            { path: 'add-rate', component: AddRateComponent }
        ]
    }
]

@NgModule({
    declarations: [
        BillingComponent,
        AddRateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class BillingModule { }

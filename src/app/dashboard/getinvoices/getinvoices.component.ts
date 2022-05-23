import { Component, OnInit, TemplateRef } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from 'src/app/models/invoice';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-getinvoices',
    templateUrl: './getinvoices.component.html',
    styleUrls: [
        '../../../assets/css/orange-blue.css',

        './getinvoices.component.scss']
})
export class GetinvoicesComponent implements OnInit {

    invoiceList: Invoice[] = [];
    p: number = 1;
    totalItemsCount: number = 0;

    constructor(private router: Router, private invoiceapi: InvoiceService) { }

    ngOnInit(): void {
        this.GetinvoiceList();
    }

    GetinvoiceList() {
        this.invoiceapi.getInvoiceList().subscribe(response => {
            this.invoiceList = response.data;
            console.log(this.invoiceList);
        });
    }

    OnClickPay(invoice: Invoice) {
        this.router.navigate(['/invoice/info/' + invoice.id])
    }

    pageChanged(event: any) {
        this.p = event;
    }

    GenerateInvoice() {
        this.router.navigate(['/invoice/create'])
    }

    navigate(path: string) {
        this.router.navigate([path])
    }
}

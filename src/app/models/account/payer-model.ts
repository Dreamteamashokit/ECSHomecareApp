import { RateModel } from "src/app/billing/component/manage_payer_and_rate/model/rate.model";

export class PayerModel extends RateModel{
    payerId: number;
    payerName: string;
    billToName:string;
    email: string;
    phone: string;
    fax: string;
    npi: string;
    fedId: string;
    etin: string;
    taxonomy: string;
    medicaidId: string;
    isActive: number;
    createdOn: string;
    createdBy: number;
    // BillingId: number;
    // Contact: number;
    // Title: string;
    // Address: string;
    // city: string;
    // state: string;
  //   zip: number;
  //   url:string;
  // NetTerms: string;
  // SenderId: string;
  // ClearingHouse: string;
  // LocationCode: string;
  // StateAggregator: string;
  // AggregatorPayerId: string;
  // LinkedPayer: string;
  // UseInvoice: string;
  // InvoiceCreation: string;
  // use_ebilling: number;
  // use_dualrates: number;


}
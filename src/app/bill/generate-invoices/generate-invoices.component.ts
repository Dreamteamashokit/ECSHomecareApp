import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-invoices',
  templateUrl: './generate-invoices.component.html',
  styleUrls: ['./generate-invoices.component.scss']
})
export class GenerateInvoicesComponent implements OnInit {

  constructor() { }
  showTable:boolean=false;
  confirmed: boolean=false;
  unconfirm:boolean=false;

  ngOnInit(): void {
  }
  toggleShowTable():void{
    this.showTable=true;
  }
  confirmeditems():void{
    debugger;
    this.confirmed=true;
  }
  unconfirmeditems():void{
    debugger;
    this.unconfirm=true;
  }

}

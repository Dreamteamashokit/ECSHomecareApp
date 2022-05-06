import { ClientBilling } from './../../models/client/client-billling-model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-client-billing',
  templateUrl: './client-billing.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css','./client-billing.component.scss']
})
export class ClientBillingComponent implements OnInit {
  modalRef?: BsModalRef;
  model= new ClientBilling();
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {
    this.modalRef?.hide();
  }
}

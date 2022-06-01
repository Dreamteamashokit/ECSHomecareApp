import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ClientNote } from 'src/app/models/client/client-note-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { setTheme } from 'ngx-bootstrap/utils';
import { ClientApiService } from 'src/app/services/client-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ItemsList, MasterType } from 'src/app/models/common';
import { LoginModel, UserModel } from 'src/app/models/account/login-model';
import { AccountService } from 'src/app/services/account.service';
import { Usertype } from 'src/app/commanHelper/usertype';
@Component({
  selector: 'app-client-note',
  templateUrl: './client-note.component.html',
  styleUrls: ['../../../assets/css/orange-blue.css', './client-note.component.scss']
})
export class ClientNoteComponent implements OnInit {
  modalRef?: BsModalRef;
  ClientId: number;
  ClientNoteObjList: any;
  empList = Array<ItemsList>();
  OfficeUserList: ItemsList[] = [];
  noteTypeList = Array<ItemsList>();
  model = new ClientNote();
  currentUser: UserModel;
  @ViewChild("templatenote") templatenote: TemplateRef<any>;
  noteId: number = 0;
  isAddVisible: Boolean = true;
  isUpdateVisible: Boolean = false;
  constructor(
    private comApi: CommonService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private accountApi: AccountService,
    private clientapi: ClientApiService
  ) {
    this.model.isActive = 1;
    this.currentUser = this.accountApi.getCurrentUser();
    this.comApi.getEmpList().subscribe((response) => {
      if (response.result) {
        this.empList = response.data;
      }
    });
    this.comApi.getNoteTypeList().subscribe((response) => {
      if (response.result) {
        this.noteTypeList = response.data;
      }
    });

    this.comApi.getUsers(Usertype.Coordinators).subscribe((response) => {
      this.OfficeUserList = response.data;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.isAddVisible = true;
        this.isUpdateVisible = false;
        this.model.userId = Number(params["clientId"]);
        this.ClientId = Number(params["clientId"]);
        this.getClientNoteRecord();
      }
    );
  }
  saveNote() {
    debugger;
    this.model.officeUserId = Number(this.model.officeUserId);
    this.model.empId = Number(this.model.empId);
    this.model.notesTypeId = Number(this.model.notesTypeId);
    this.model.notes = this.model.notes;
    if (this.model.notifyTypeId1) {
      this.model.notifyTypeId = Number(this.model.notifyTypeId1);
    }
    if (this.model.notifyTypeId2) {
      this.model.notifyTypeId = Number(this.model.notifyTypeId2);
    }
    if (this.model.notifyTypeId3) {
      this.model.notifyTypeId = Number(this.model.notifyTypeId3);
    }
    this.model.isActive = 1;
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.ClientId);
    this.clientapi.SaveNotes(this.model).subscribe(Responce => {
      this.decline();
      this.getClientNoteRecord();
    })
  }
  updateNote() {
    debugger;
    this.model.officeUserId = Number(this.model.officeUserId);
    this.model.empId = Number(this.model.empId);
    this.model.notesTypeId = Number(this.model.notesTypeId);
    this.model.notes = this.model.notes;
    if (this.model.notifyTypeId1) {
      this.model.notifyTypeId = 1;
    }
    if (this.model.notifyTypeId2) {
      this.model.notifyTypeId = 2;
    }
    if (this.model.notifyTypeId3) {
      this.model.notifyTypeId = 3;
    }
    this.model.isActive = 1;
    this.model.createdBy = this.currentUser.userId;
    this.model.userId = Number(this.ClientId);
    this.model.notesId = this.noteId;
    this.clientapi.updateClientNotes(this.model).subscribe(Responce => {
      debugger;
      this.decline();
      this.getClientNoteRecord();
    })

  }
  updateNoteData(clientnoteId: number) {
    this.noteId = clientnoteId;
    this.model.notesId = this.noteId;
    this.clientapi.getClientNoteDetails(this.model).subscribe((Responce: any) => {
      if (Responce.data.length > 0) {
        this.model.officeUserId = Number(Responce.data[0].officeUserId);
        this.model.empId = Number(Responce.data[0].empId);
        this.model.notes = Responce.data[0].notes;
        if (Responce.data[0].notifyTypeId == 1) {
          this.model.notifyTypeId1 = 1;
        }
        if (Responce.data[0].notifyTypeId == 2) {
          this.model.notifyTypeId2 = 1;
        }
        if (Responce.data[0].notifyTypeId == 3) {
          this.model.notifyTypeId3 = 1;
        }
        this.model.notesTypeId = Number(Responce.data[0].notesTypeId);
        this.isAddVisible = false;
        this.isUpdateVisible = true;
        this.openModal(this.templatenote);
      }
    });
  }
  deleteNoteData(clientnoteId: number) { 
    debugger;
    this.noteId = clientnoteId;
    this.model.notesId = this.noteId;
    this.clientapi.deleteClientNote(this.model).subscribe((response) => {
      this.getClientNoteRecord();
      this.decline();
    });
  }
  getClientNoteRecord() {
    debugger;
    this.model = new ClientNote();
    this.model.userId = this.ClientId;
    this.clientapi.getClientNoteRecord(this.model).subscribe((Response: any) => {
 
      this.ClientNoteObjList = Response.data;
      console.log("Rakesh");
      console.log( this.ClientNoteObjList);
      this.isAddVisible = true;
      this.isUpdateVisible = false;
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  decline(): void {
    this.model = new ClientNote();
    this.modalRef?.hide();
  }
}

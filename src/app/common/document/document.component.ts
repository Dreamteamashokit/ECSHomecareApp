import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
  HttpEventType,
  HttpClient,
  HttpResponseBase,
} from "@angular/common/http";
import { EmployeeapiService } from "src/app/services/employeeapi.service";
import { DocumentService } from "src/app/services/document.service";
import { ActivatedRoute, Params } from "@angular/router";
import { saveAs } from "file-saver";
import { DeleteItem } from "src/app/models/employee/deleteFolder";
import { FolderData } from "src/app/models/employee/document";
import {
  UploadFileFolder,
  DocumentView,
  NewFolderView,
} from "src/app/models/employee/upload-file-folder";
import { AccountService } from "src/app/services/account.service";
import { UserModel } from "src/app/models/account/login-model";
import { FolderView } from "src/app/models/employee/upload-file-folder";
import { ToastrManager } from "ng6-toastr-notifications";

import { FolderModel } from "src/app/models/common/folder-model";
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: [
    "../../../assets/css/orange-blue.css",
    "./document.component.scss",
  ],
})
export class DocumentComponent implements OnInit {
  IsLoad: boolean = false;

  IsClient: boolean = false;
  fModel: FolderModel = new FolderModel();

  public progress: number;
  public message: string;
  folderName: string;

  NewFolderList: NewFolderView[] = [];
  FolderList: FolderView[] = [];
  currentUser: UserModel;
  Deletemodel = new DeleteItem(0, 0, 0, 0, "", "");
  model = new UploadFileFolder("", "", 0, "", "", "");

  @Input() data: any;

  @ViewChild("file", { static: false })
  myFileInput: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private accountApi: AccountService,
    private empApi: EmployeeapiService,
    private docSrv: DocumentService,
    private toastr: ToastrManager
  ) {
    this.currentUser = this.accountApi.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params["empId"] != null) {
        this.fModel.userId = Number(params["empId"]);
        this.IsClient = false;
        //this.GetFolderList(this.fModel.userId);
        this.GetFolderList(this.fModel.userId);
      } else {
        this.fModel.userId = Number(params["clientId"]);

        this.IsClient = true;
        //this.GetFolderList(this.fModel.userId);
        this.GetFolderList(this.fModel.userId);
      }
    });
  }

  CreateFolder(foldername: string) {
    this.fModel.userId = Number(this.fModel.userId);
    this.fModel.createdBy = this.currentUser.userId;
    this.fModel.folderName = foldername;
    const reqObj: FolderModel = this.fModel;
    this.IsLoad = true;
    if (foldername != "") {
      this.docSrv.addFolder(reqObj).subscribe((response) => {
        this.GetFolderList(this.fModel.userId);
        this.folderName = "";
        this.IsLoad = false;
      });
    } else {
      this.IsLoad = false;
      this.toastr.infoToastr("Please Input Folder Name!", "Info!");
    }
  }

  CreateSubFolder(parentFolderId: number, folderName: string) {
    let subfolderName = prompt("Please enter your folder name", "");

    if (
      subfolderName != null &&
      subfolderName != "" &&
      subfolderName != undefined
    ) {
      this.fModel.userId = Number(this.fModel.userId);
      this.fModel.createdBy = this.currentUser.userId;
      this.fModel.folderName = subfolderName;
      this.fModel.parentFolderId = parentFolderId;
      this.fModel.parentFolderName = folderName;
      const reqObj: FolderModel = this.fModel;
      this.IsLoad = true;

      this.docSrv.addFolder(reqObj).subscribe((response) => {
        this.GetFolderList(this.fModel.userId);
        this.folderName = "";
        this.IsLoad = false;
        this.fModel.parentFolderId = 0;
        this.fModel.parentFolderName = "";
      });
    }
  }

  GetFolderList(userId: number,forType:string='tree') {
   
    if(forType=='tree'){
      this.docSrv.gettreeDocumentlist(userId,forType).subscribe((res) => {
        this.NewFolderList = res.data;
      });
    }
    else{
    this.docSrv.getDocumentlist(userId).subscribe((response) => {
      this.FolderList = response.data;
    });
  }
  }


  DeleteFolder(folderId: number) {
    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.IsLoad = true;
      this.docSrv
        .deleteFolder(folderId, this.fModel.userId)
        .subscribe((response) => {
          if (response.result) {
            this.IsLoad = false;
            this.GetFolderList(this.fModel.userId);
          } else {
            this.IsLoad = false;
          }
        });
    }
  }

  cleanobj() {
    this.model.folderId = 0;
    this.model.fileName = "";
    this.model.title = "";
    this.model.search = "";
    this.model.description = "";
    this.model.createdBy = 0;
    this.myFileInput.nativeElement.value = "";
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      this.toastr.infoToastr("Please choose file!", "Info!");
      return;
    } else {
      this.IsLoad = true;
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      // alert($("#ddlFolderId option:selected").text())
      // for (let o of this.FolderList) {
      //   if (o.folderId == Number(this.model.folderId)) {
      //     this.model.folderName = o.folderName;
      //   }
      // }
      this.model.folderName =$("#ddlFolderId option:selected").text();
      this.model.folderId = Number(this.model.folderId);
      this.model.fileName = this.model.fileName;
      this.model.title = this.model.title;
      this.model.search = this.model.search;
      this.model.description = this.model.description;
      this.model.userId = Number(this.fModel.userId);
      this.model.createdBy = this.currentUser.userId;
      formData.append("file", fileToUpload, fileToUpload.name);
      formData.append("FolderId", this.model.folderId.toString());
      formData.append("Filename", fileToUpload.name);
      formData.append("Title", this.model.title);
      formData.append("Search", this.model.search);
      formData.append("Description", this.model.description);
      formData.append("UserId", this.model.userId.toString());
      formData.append("CreatedBy", this.model.createdBy.toString());
      formData.append("FolderName", this.model.folderName);
      this.docSrv.UploadFile(formData).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.ResponseHeader) {
          this.IsLoad = false;
          this.message = "Upload success.";
          this.cleanobj();
          this.GetFolderList(this.fModel.userId);
        }
      });
    }
  };

 

  DownloadFile(documentName: string, foldername: string) {
    this.IsLoad = true;
    this.docSrv.DownloadFile(documentName, foldername).subscribe((data) => {
      saveAs(new Blob([data], { type: "pdf" }), documentName);
      this.IsLoad = false;
    });
  }

  DeleteFile(obj: DocumentView, folderName: string, folderId: number) {
    this.Deletemodel.documentId = Number(obj.documentId);
    this.Deletemodel.folderId = Number(folderId);
    this.Deletemodel.folderName = folderName;
    this.Deletemodel.userId = this.fModel.userId;
    this.Deletemodel.requestType = 2;
    this.Deletemodel.fileName = obj.fileName;

    let isOk = confirm("Are you sure to delete?");
    if (isOk) {
      this.docSrv.DeleteFile(this.Deletemodel).subscribe((Response) => {
        this.GetFolderList(this.fModel.userId);
      });
    }
  }

  openfile(url: string) {
    window.open();
  }
}

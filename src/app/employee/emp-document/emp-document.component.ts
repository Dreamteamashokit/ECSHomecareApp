import { Component, OnInit, Input ,ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpClient, HttpResponseBase } from '@angular/common/http';
import { EmployeeapiService } from 'src/app/services/employeeapi.service';
import{ DocumentService} from 'src/app/services/document.service';
import { ActivatedRoute, Params } from '@angular/router';
import { saveAs } from 'file-saver';
import{ DeleteItem} from 'src/app/models/employee/deleteFolder';
import { FolderData } from 'src/app/models/employee/document';
import{ UploadFileFolder } from 'src/app/models/employee/upload-file-folder';
import { AccountService } from 'src/app/services/account.service';
import { UserModel } from 'src/app/models/account/login-model';
import{ FolderView } from 'src/app/models/employee/upload-file-folder';
import { ToastrManager } from 'ng6-toastr-notifications';




@Component({
  selector: 'app-emp-document',
  templateUrl: './emp-document.component.html',
  styleUrls: [
    '../../../assets/css/orange-blue.css',
    './emp-document.component.scss']
})
export class EmpDocumentComponent implements OnInit {
  IsLoad: boolean = false;
  public progress: number;
  public message: string;
  folderName:string
  empId:number;
  FolderList :FolderView[]=[];
  currentUser:UserModel;
  Deletemodel =new DeleteItem(0,0,0,0,"","");
  model=new UploadFileFolder("","",0,"","","");
  UserId:number;
  @Input() data:any;

  @ViewChild('file', {static: false})
  myFileInput: ElementRef;

  
  constructor(private route:ActivatedRoute,
    private http: HttpClient,
    private accountApi: AccountService,
    private empApi: EmployeeapiService,
    private docSrv: DocumentService,
    private toastr: ToastrManager) {
      this.currentUser=this.accountApi.getCurrentUser();
         }

 
  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
     
        if (params["empId"] != null) {
          this.UserId = Number(params["empId"]);
        }
        else {
          this.UserId = Number(params["clientId"]);
        }

        this.GetFolderList(this.UserId);
      }
    );
  
  }
  

  public uploadFile = (files:any) => {
    if (files.length === 0) {
      this.toastr.infoToastr("Please choose file!", 'Info!');
      //alert("Please choose file");
      return;
    }
    else
    {
      this.IsLoad=true;
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    for(let o of this.FolderList){
     
      if(o.folderId==Number(this.model.folderId))
      {
       this.model.folderName=o.folderName;
      }
   }
    this.model.folderId=Number(this.model.folderId);
    this.model.fileName=this.model.fileName;
    this.model.title=this.model.title;
    this.model.search=this.model.search;
    this.model.description=this.model.description;
    this.model.userId=Number(this.UserId);
    this.model.createdBy=this.currentUser.userId;
    formData.append('file', fileToUpload, fileToUpload.name);  
    formData.append('folderid',this.model.folderId.toString());
    formData.append('filename',fileToUpload.name);
    formData.append('Title',this.model.title);
    formData.append('Search',this.model.search);
    formData.append('Description',this.model.description);
    formData.append('UserId',this.model.userId.toString());
    formData.append('CreatedBy',this.model.createdBy.toString());
    formData.append('Foldername', this.model.folderName);
    this.docSrv.UploadFile(formData).subscribe(event => {
    
      if (event.type === HttpEventType.UploadProgress)
      {
        // this.progress = Math.round(100 * event.loaded / event.total);
      
      }
      else if (event.type === HttpEventType.ResponseHeader) {
        this.IsLoad=false;
      this.message = 'Upload success.';
     this.cleanobj();
     this.GetFolderList(this.UserId);
    } 
      });    
    }
      
  }

  CreateFolder(foldername:string){

    if(foldername!='')
    {
      this.IsLoad=true;
      var data=new FolderData(this.UserId,foldername);
      data.createdBy=this.currentUser.userId;
      //  this.docSrv.folderCreate(data).subscribe(Response=>{ 
      //       this.GetFolderList(this.UserId);
      //       this.folderName="";
      //       this.IsLoad=false;
      //  });
    }
    else
    {
      this.toastr.infoToastr("Please Input Folder Name!", 'Info!');
     // alert("Please Input Folder Name");
    }

    
  }


  GetFolderList(UserId:number){
  //   this.docSrv.GetFolderList(UserId).subscribe(response=>{     
  //    this.FolderList=response.data;
  //    console.log("file");
  //    console.log(response.data);
  // });
}

cleanobj(){
  this.model.folderId=0;
  this.model.fileName="";
  this.model.title="";
  this.model.search="";
  this.model.description="";
  this.model.createdBy=0;
  this.myFileInput.nativeElement.value = '';
 
}

DownloadFile(documentName:string,foldername:string)
{
  this.IsLoad=true;
  this.docSrv.DownloadFile(documentName,foldername).subscribe(data=>{
   saveAs(new Blob([data],{type:'pdf'}),documentName);
   this.IsLoad=false;
  });
}

DeleteFolder(folderId:number){
 
  let isOk = confirm("Are you sure to delete?");
    if(isOk)
    {
      this.IsLoad=true;
  // this.docSrv.deleteFolder(folderId).subscribe(response=>{

  //   if(response.result)
  //   {
  //     this.GetFolderList(this.UserId);
  //   }
  //   this.IsLoad=false;
  // });
}
}

DeleteFile(obj:any,foldername:string,folderid:number){
  this.Deletemodel.documentId=Number(obj.documentId);
  this.Deletemodel.folderId=0;
  this.Deletemodel.folderName=obj.foldername;
  this.Deletemodel.userId=this.UserId;
  this.Deletemodel.requestType=2;
  this.Deletemodel.fileName=obj.fileName;



  let isOk = confirm("Are you sure to delete?");
    if(isOk)
    {

  this.docSrv.DeleteFile(this.Deletemodel).subscribe(Response=>{
    this.GetFolderList(this.UserId);
  });
}
}

openfile(url:string){
  window.open()
}


}



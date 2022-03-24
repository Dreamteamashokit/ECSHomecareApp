import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { EmployeeapiService } from 'src/app/Service/employeeapi.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
 
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient,private empApi: EmployeeapiService) { }

  ngOnInit(): void {
  }

  public uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);  
    this.empApi.UploadFile(formData).subscribe(event => {
      debugger
         if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });;
  }

}

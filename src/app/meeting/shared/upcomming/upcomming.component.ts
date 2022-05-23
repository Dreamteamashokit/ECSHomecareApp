import { Component, OnInit ,Input} from '@angular/core';
import { MeetingService } from 'src/app/services/meeting.service';
import { MeetingView } from 'src/app/models/meeting/meeting-view';

@Component({
  selector: 'app-upcomming',
  templateUrl: './upcomming.component.html',
  styleUrls: [
    '../../../../assets/css/orange-blue.css',
    './upcomming.component.scss']
})
export class UpcommingComponent implements OnInit {
    // @Input() userId?:number;
  @Input() userId = 0;
  appList: MeetingView[]=[];
  constructor(private momApi:MeetingService) {
    if(this.userId>0)
    {
      this.BindMeeting(this.userId);
    }
   }

  ngOnInit(): void {

    if(this.userId>0)
    {
      this.BindMeeting(this.userId);
    }
  }


  BindMeeting(clientId : number)
  {
    this.momApi.upcommingMeeting(clientId).subscribe((response) => {
      if(response.result)
      {    
        this.appList = response.data;
      }
    });
  }







}



import { UserView ,NameClass} from 'src/app/models/common/user-view';

export class MeetingView {
    meetingId: number;
    meetingDate: string;
    startTime: string;
    endTime: string;
    meetingNote: string;
    employee: UserView;
    client: UserView;
    notes: string[];
    isStatus:number;
}




export interface MeetingLog {
    meetingId: number;
    logNote: string;
    createdOn: string;
    createdBy: NameClass;
}



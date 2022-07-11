export class MeetingStatus {
        meetingId: number;
        isStatus: number;
        meetingNote: string;
        meetingCanceledReason:string;
}
export class NotesModel {
        meetingId: number;
        meetingPoint: string;
        createdBy: number;
}
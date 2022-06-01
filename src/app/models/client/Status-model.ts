export class ClientStatusModel{
    activityId:number;
    date:string;
    referralCode:number;
    note:string;
    officeUserId:number;
    officeUserReferralID:number;
    clientId:Number;
    text:boolean;
    screen:boolean;
    email:boolean;
    createdBy:number;

    statusId: number;
    userId: number;
    statusDate: string;
    isActive: number;







     constructor(_ActivityId:number, _Date:string,_ReferralCode:number,_Note:string,_OfficeUserId:number,_OfficeUserReferralID:number,
         _clientId:Number,_officeUserId:number,_text:boolean,_screen:boolean,_email:boolean,)
     {
         this.activityId=_ActivityId;
         this.date=_Date;
         this.referralCode=_ReferralCode;
         this.note=_Note;
         this.officeUserId=_OfficeUserId;
         this.officeUserReferralID=_OfficeUserReferralID;
         this.clientId=_clientId;        
         this.text=_text;
         this.screen=_screen;
         this.email=_email;
     }
}

export class ClientStatusLst{
    statusId:number;
    activityText:string;
    activityId:number;
    statusDate:string;
    referralCodeText:string;
    referralCode:number;
    note:string;
    isEdit:boolean;
    effectiveDate:Date;
    constructor(_ActivityText:string, _Date:string,_ReferralCode:string,_Note:string)
    {
        this.activityText=_ActivityText;
        this.statusDate=_Date;
        this.referralCodeText=_ReferralCode;
        this.note=_Note;  
        this.isEdit=false;
        this.effectiveDate=new Date(_Date);
    }
}



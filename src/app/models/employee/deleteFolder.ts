
export class DeleteItem 
{
  public  userId :number;
   public folderId :number;        
    public  documentId :number;
    public  requestType :number;
    public  fileName :string;
    public  folderName :string;

    constructor(_userId:number,_folderId:number,_documentId:number,_RequestType:number,_fileName:string,_FolderName:string)
    {
        this.userId=_userId;
        this.folderId=_folderId;
       this.documentId=_documentId;
       this.requestType=_RequestType;
       this.fileName=_fileName;
       this.folderName=_FolderName
    }
}

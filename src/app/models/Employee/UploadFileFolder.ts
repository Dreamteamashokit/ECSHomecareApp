export class UploadFileFolder
{
  public  title :string;
   public folderId :number;
   public search:string;
   public description:string;
   public fileName:string;
   public folderName:string;
    public  createdBy :number;
    constructor(_Title:string,_Search:string,_folderid:number,_Description:string,_filename:string,_Foldername:string)
    {
        this.title=_Title;
        this.search=_Search;
        this.folderId=_folderid;
        this.description=_Description;
        this.fileName=_filename;
        this.folderName=_filename;
    }
}
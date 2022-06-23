
export class BaseModel {
  entityId:number;
  userId: number;
  createdOn: string;
  createdBy: number;
  isActive: number;
}


export class BaseJson {
  userId: number;
  isActive: number;
  createdBy: number;
  createdByName: string;
  createdOn: string;
  modifiedBy: number;
  modifiedByName: number;
  modifiedOn: string;
}


export class ItemsList {
    public itemId: number;
    public itemName: string;
    constructor(_itemId : number, _itemName : string)
    {
        this.itemId = _itemId;
        this.itemName = _itemName;
    }
}



  export class SelectList {
    public itemCode: string;
    public itemName: string;
    constructor(_itemCode : string, _itemName : string)
    {
        this.itemCode = _itemCode;
        this.itemName = _itemName;
    }
}

export enum MasterType {
    Status = 1,
    MaritalStatus,
    Gender,
    Ethnicity,
    EmpStatusType,
    ClientStatusActivity,
    ClientStatusReferralCode,
    CaseType,
    AbsenceActivity,
    ComplianceStatus
  }


  export enum StatusEnum {
    Deleted = 0,
    Active,
    Cancelled,
    CancelledByClient,
    
  }


  export enum AddressType {
    Permanent = 1,
    Communication,

  }



  export class CheckBoxList {
    public itemId: number;
    public itemName: string;
    public IsChecked: boolean;
    constructor(itemId : number, itemName : string,IsChecked: boolean)
    {
        this.itemId = itemId;
        this.itemName = itemName;
        this.IsChecked = IsChecked;
    }
    
}


export enum UserType {
  SuperAdmin = 1,
  Administrators = 2,
  Coordinators = 3,
  HR = 4,
  Nursing = 5,
  OfficeStaff = 6,
  Billing=7,
  Employee = 8,
  Client = 9
}


 

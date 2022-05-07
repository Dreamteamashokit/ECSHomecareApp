import { BaseModel } from "../common";

export class AddressObj extends BaseModel {
    public addressId: number;
    public empId: number;
    public addressType: number;
    public owner: string;
    public flatNo: string;
    public address: string;
    public country: string;
    public state: string;
    public city: string;
    public zipCode: string;
    public latitude:string;
    public longitude:string;

    // constructor(_addressId : number, _empId : number, _addressType : number, _owner : string, _flatNo : string, _address : string, _country : string, _state : string, _city : string,_zipCode: string,_latitude:string,_longitude:string)
    // {
    //     this.addressId = _addressId;
    //     this.empId = _empId;
    //     this.addressType = _addressType;
    //     this.owner = _owner;     
    //     this.flatNo = _flatNo;
    //     this.address = _address;
    //     this.country = _country;
    //     this.state = _state;
    //     this.city = _city;
    //     this.zipCode = _zipCode;
    //     this.latitude=_latitude;
    //     this.longitude=_longitude;
    // }




}

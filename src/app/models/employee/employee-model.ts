
import { AccountUserModel} from 'src/app/models/account/account-model';

export class EmployeeModel extends AccountUserModel {
    empId: number;
    empKey: string;
    empType: number;
    dateOfHire: string;
    dateOfFirstCase: string;
    enthnicity: number;
    dependents: number;
    city: string;
    country: string;
    taxState: string;
    zipCode: string;
    municipality: string;
  
}


export class EmployeeList {
    empId: number;
    empName: string;
    cellPhone: string;
    empType: string;
    typeId: number;
    sSN: string;
    taxState: string;
    empKey: string;
    empStatus: number;
    hasDOB: boolean;
    hasEmail: boolean;
    managerId:number;
    coordinator: string;
    medical: boolean;
    inService: boolean;
    isActive: number;
}

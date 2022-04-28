import { AccountJson} from 'src/app/models/account/account-json';

export class EmployeeJson extends AccountJson {
    empId: number;
    empKey: string;
    empType: number;
    empTypeName: string;
    dateOfHire: string;
    dateOfFirstCase: string;
    enthnicity: number;
    enthnicityName: string;
    dependents: number;
    city: string;
    country: string;
    taxState: string;
    zipCode: string;
    municipality: string;
    notes: string;
}

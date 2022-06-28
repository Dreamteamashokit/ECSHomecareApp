import { BaseModel } from "../common";

export class CategoryModel extends BaseModel {
    categoryId: number;
    userTypeId: number;
    categoryName: string;
    parentId: number | null;
    parentName: string;
    isRecurring: boolean;
    recurrType: number;
    recurrValue: number;
    recurrSrcType: number;
    recurrNotifyDays: number;
    recurrDate: Date;
    
}









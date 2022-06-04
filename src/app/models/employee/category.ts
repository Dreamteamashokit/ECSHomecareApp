import { BaseModel } from "../common";

export class CategoryModel extends BaseModel {
    public categoryId: number;
    public categoryName: string;    
    public parentCategoryId: number;
    public parentCategoryName: string;
}

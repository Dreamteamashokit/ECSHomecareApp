import { BaseModel } from "../common";

export class CategoryModel extends BaseModel {
    public categoryId: number;
    public categoryName: string;    
    public parentCategoryId: string;
    public parentCategoryName: string;
}

import type { Category } from "../models/Category";

export interface IUpdateCategoryBody extends Category {
    id: string;
}
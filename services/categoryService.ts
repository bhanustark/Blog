import { Category } from "../models/Category";
import type { Category as CategoryType } from "../models/Category";

export const CategoryService = class {
    private categories: CategoryType[]
    constructor() {
        this.categories = []
    }
    setCategories = async (categories: CategoryType[]) => {
        this.categories = categories
    }
    getCategories = async (): Promise<CategoryType[]> => {
        if (this.categories.length) {
            return this.categories
        } else {
            const categories = await Category.find()
            if (categories)
                //Caching categories
                this.categories = categories;
            return categories
        }
    }
}
const categoryService = new CategoryService()

export default categoryService;
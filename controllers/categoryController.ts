import type { IUpdateCategoryBody } from "../interfaces/CategoryInterfaces"
import { Category } from "../models/Category"
import type { Category as CategoryType } from "../models/Category"

export default {
    add: async ({ body }: { body: CategoryType }) => {
        const { title, slug } = body
        if (title && slug) {
            const category = new Category({ title, slug })
            await category.save()
            return category
        } else {
            throw new Error("Cannot save category")
        }
    },
    update: async ({ body }: { body: IUpdateCategoryBody }) => {
        const { id, title, slug } = body
        if (id && title && slug) {
            const category = await Category.findByIdAndUpdate(id, { title, slug }, { new: true })
            return category
        } else {
            throw new Error("Cannot update category")
        }
    },
    getAll: async () => {
        const categories = await Category.find()
        return categories;
    }
}
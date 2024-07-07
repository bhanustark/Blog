import type { IUpdateCategoryBody } from "../interfaces/CategoryInterfaces"
import { Category } from "../models/Category"
import type { Category as CategoryType } from "../models/Category"

export default {
    add: async ({ jwt, body }: { jwt: any, body: CategoryType }) => {
        const { title, slug } = body
        const category = new Category({ title, slug })
        await category.save()
        return category
    },
    update: async ({ jwt, body }: { jwt: any, body: IUpdateCategoryBody }) => {
        const { id, title, slug } = body
        const category = await Category.findByIdAndUpdate(id, { title, slug }, { new: true })
        return category
    },
    getAll: async () => {
        const categories = await Category.find()
        return categories;
    }
}
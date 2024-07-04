import { Category } from "../models/Category"

export default {
    add: async ({ body }) => {
        const { title, slug } = body
        if (title && slug) {
            const category = new Category({ title, slug })
            await category.save()
            return category
        } else {
            throw new Error("Cannot save category")
        }
    },
    update: async ({body}) => {
        const {id, title, slug} = body
        if(id && title && slug) {
            const category = await Category.findByIdAndUpdate(id, {title, slug}, {new: true})
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
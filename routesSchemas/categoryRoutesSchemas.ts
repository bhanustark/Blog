import { t } from "elysia"
import { adminAuthRequired, authRequired } from "../middlewares/auth"
import { DOCUMENTATION_TAGS } from "../constant"

const addCategoryType = {
    title: t.String(),
    slug: t.String()
}

const updateCategoryType = {
    ...addCategoryType,
    _id: t.String()
}

const addCategoryRouteSchema = {
    body: t.Object(addCategoryType,
        {
            description: 'Expected a title and a slug'
        }),
    detail: {
        summary: 'Create new category',
        tags: [DOCUMENTATION_TAGS.CATEGORY.name]
    },
    beforeHandle: async (args: any) => {
        await adminAuthRequired(args)
    }
}

const updateCategoryRouteSchema = {
    body: t.Object(updateCategoryType, {
        description: 'Expected id, title and slug'
    }),
    detail: {
        summary: 'Update a category',
        tags: [DOCUMENTATION_TAGS.CATEGORY.name]
    },
    beforeHandle: async (args: any) => {
        await adminAuthRequired(args)
    }
}

const getAllCategoryRouteSchema = {
    detail: {
        summary: 'Get all categories',
        tags: [DOCUMENTATION_TAGS.CATEGORY.name]
    }
}


export default { addCategoryRouteSchema, updateCategoryRouteSchema, getAllCategoryRouteSchema }
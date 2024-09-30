import { t } from "elysia"
import { DOCUMENTATION_TAGS } from "../constant"
import { authRequired } from "../middlewares/auth"

const addBlogType = {
    title: t.Required(t.String({
        minLength: 5,
        maxLength: 100
    })),
    description: t.Optional(t.String({
        minLength: 50,
        maxLength: 200
    })),
    keywords: t.Optional(t.String({
        minLength: 3
    })),
    content: t.Required(t.String({
        minLength: 50
    })),
    slug: t.Required(t.String({
        minLength: 5,
        maxLength: 2048
    })),
    image: t.Optional(t.String({
        minLength: 5,
        maxLength: 2048
    })),
    categories: t.Optional(t.Array(t.String({
        minLength: 5
    }))),
}

const addBlogRouteSchema = {
    body: t.Object(addBlogType,
        {
            description: 'Title, slug, and content fields are required and description, keywords, image, and categories are optional fields.'
        }
    ),
    detail: {
        summary: 'Add blog',
        tags: [DOCUMENTATION_TAGS.BLOG.name]
    },
    beforeHandle: async (args: any) => {
        await authRequired(args)
    }
}

const getBlogsPaginatedRouteSchema = {
    detail: {
        summary: 'Get blogs paginated',
        tags: [DOCUMENTATION_TAGS.BLOG.name]
    }
}

export default { addBlogRouteSchema, getBlogsPaginatedRouteSchema }
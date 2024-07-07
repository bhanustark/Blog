import { t } from "elysia"
import { DOCUMENTATION_TAGS } from "../constant"
import { authRequired } from "../middlewares/auth"

const addPostType = {
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

const addPostRouteSchema = {
    body: t.Object(addPostType,
        {
            description: 'Title, slug, and content fields are required and description, keywords, image, and categories are optional fields.'
        }
    ),
    detail: {
        summary: 'Add post',
        tags: [DOCUMENTATION_TAGS.POST.name]
    },
    beforeHandle: async (args: any) => {
        await authRequired(args)
    }
}

const getPostsPaginatedRouteSchema = {
    detail: {
        summary: 'Get posts paginated',
        tags: [DOCUMENTATION_TAGS.POST.name]
    }
}

export default { addPostRouteSchema, getPostsPaginatedRouteSchema }
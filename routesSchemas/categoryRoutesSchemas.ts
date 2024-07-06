import { t } from "elysia"

const addCategoryRouteSchema = {
    body: t.Object({
        title: t.String(),
        slug: t.String()
    })
}

const updateCategoryRouteSchema = addCategoryRouteSchema;
updateCategoryRouteSchema.body.id = t.String();


export default { addCategoryRouteSchema, updateCategoryRouteSchema }
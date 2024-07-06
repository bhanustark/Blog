import { t } from "elysia"

const loginUserRouteSchema = {
    body: t.Object({
        email: t.String(),
        password: t.String()
    })
}

const addUserRouteSchema = loginUserRouteSchema
addUserRouteSchema.body.name = t.String()

const updateUserRouteSchema = addUserRouteSchema;
updateUserRouteSchema.body.id = t.String();


export default { loginUserRouteSchema, addUserRouteSchema, updateUserRouteSchema }
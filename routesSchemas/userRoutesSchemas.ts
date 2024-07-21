import { t } from "elysia"
import { adminAuthRequired, authRequired } from "../middlewares/auth"
import { DOCUMENTATION_TAGS } from "../constant"

const loginUserType = {
    email: t.String({
        format: "email"
    }),
    password: t.String({
        maxLength: 30,
        minLength: 10
    })
}

const signUpUserType = {
    ...loginUserType,
    name: t.String({
        minLength: 3,
        maxLength: 30
    })
}

const loginUserRouteSchema = {
    body: t.Object(loginUserType,
        {
            description: 'Expected an email and a password'
        }
    ),
    detail: {
        summary: 'Login user',
        tags: [DOCUMENTATION_TAGS.USER.name]
    }
}

const signUpUserRouteSchema = {
    body: t.Object(signUpUserType,
        {
            description: 'Expected a name, an email and a password'
        }
    ),
    detail: {
        summary: 'Create new user',
        tags: [DOCUMENTATION_TAGS.USER.name]
    }
}


const updateUserRouteSchema = {
    body: t.Object(signUpUserType,
        {
            description: 'Expected a name, an email and a password'
        }
    ),
    detail: {
        summary: 'Update user',
        tags: [DOCUMENTATION_TAGS.USER.name]
    },
    beforeHandle: async (args: any) => {
        await adminAuthRequired(args)
    }
}

const getUserRouteSchema = {
    params: t.Object({
        userId: t.String({
            minLength: 5,
        })
    }),
    detail: {
        summary: 'Get a user',
        tags: [DOCUMENTATION_TAGS.USER.name]
    }
}


export default { loginUserRouteSchema, signUpUserRouteSchema, updateUserRouteSchema, getUserRouteSchema }
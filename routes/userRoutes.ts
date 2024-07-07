import type Elysia from "elysia"
import userController from "../controllers/userController"
import userRoutesSchemas from "../routesSchemas/userRoutesSchemas"

const userRoutePath = "/api/user/"

export default async function (app: Elysia) {
    app.post(`${userRoutePath}signup`, userController.signup, userRoutesSchemas.signUpUserRouteSchema)
    app.post(`${userRoutePath}login`, userController.login, userRoutesSchemas.loginUserRouteSchema)
    app.get(`${userRoutePath}:userId`, userController.getUserById, userRoutesSchemas.getUserRouteSchema)
    return app
}
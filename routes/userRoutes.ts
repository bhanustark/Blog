import type Elysia from "elysia"
import userController from "../controllers/userController"
import userRoutesSchemas from "../routesSchemas/userRoutesSchemas"

export default async function (app: Elysia) {
    app.post("/api/user/signup", userController.signup, userRoutesSchemas.addUserRouteSchema)
    app.post("/api/user/login", userController.login, userRoutesSchemas.loginUserRouteSchema)
    app.get("/api/user/getUserById/:userId", userController.getUserById)
    return app
}
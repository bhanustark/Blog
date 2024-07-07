import type Elysia from "elysia";
import postController from "../controllers/postController";
import postRoutesSchemas from "../routesSchemas/postRoutesSchemas";

const postRoutePath = "/api/post/"

export default async function (app: Elysia) {
    app.post(`${postRoutePath}add`, postController.addPost, postRoutesSchemas.addPostRouteSchema)
    app.get(`${postRoutePath}get`, postController.getPostsPaginated, postRoutesSchemas.getPostsPaginatedRouteSchema)
    return app
}
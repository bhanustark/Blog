import type Elysia from "elysia";
import postController from "../controllers/postController";
import postRoutesSchemas from "../routesSchemas/postRoutesSchemas";

const postRoutePath = "/api/post/"

export default async function (app: Elysia) {
    app.post(`${postRoutePath}add`, postController.addPost, postRoutesSchemas.addPostRouteSchema)
    app.get(`${postRoutePath}get`, postController.getPostsPaginated, postRoutesSchemas.getPostsPaginatedRouteSchema)
    app.get(`${postRoutePath}get/:pageNumber`, postController.getPostsPaginated, postRoutesSchemas.getPostsPaginatedRouteSchema)
    app.get(`${postRoutePath}get/sitemap/:pageNumber`, postController.getPostsForSitemap, postRoutesSchemas.getPostsPaginatedRouteSchema)
    app.get(`${postRoutePath}get/newssitemap/:pageNumber`, postController.getPostsForNewsSitemap, postRoutesSchemas.getPostsPaginatedRouteSchema)
    app.get(`${postRoutePath}get/newssitemap/:pageNumber/:category`, postController.getPostsForNewsSitemap, postRoutesSchemas.getPostsPaginatedRouteSchema)
    app.get(`${postRoutePath}get/:pageNumber/:category`, postController.getPostsPaginated, postRoutesSchemas.getPostsPaginatedRouteSchema)
    app.get(`${postRoutePath}byslug/:slug`, postController.getPostBySlug, postRoutesSchemas.getPostsPaginatedRouteSchema)
    return app
}
import type Elysia from "elysia";
import blogController from "../controllers/blogController";
import blogRoutesSchemas from "../routesSchemas/blogRoutesSchemas";

const blogRoutePath = "/api/blog/"

export default async function (app: Elysia) {
    app.post(`${blogRoutePath}add`, blogController.addBlog, blogRoutesSchemas.addBlogRouteSchema)
    app.get(`${blogRoutePath}get`, blogController.getBlogsPaginated, blogRoutesSchemas.getBlogsPaginatedRouteSchema)
    app.get(`${blogRoutePath}get/:pageNumber`, blogController.getBlogsPaginated, blogRoutesSchemas.getBlogsPaginatedRouteSchema)
    app.get(`${blogRoutePath}get/sitemap/:pageNumber`, blogController.getBlogsForSitemap, blogRoutesSchemas.getBlogsPaginatedRouteSchema)
    app.get(`${blogRoutePath}get/newssitemap/:pageNumber`, blogController.getBlogsForNewsSitemap, blogRoutesSchemas.getBlogsPaginatedRouteSchema)
    app.get(`${blogRoutePath}get/newssitemap/:pageNumber/:category`, blogController.getBlogsForNewsSitemap, blogRoutesSchemas.getBlogsPaginatedRouteSchema)
    app.get(`${blogRoutePath}get/:pageNumber/:category`, blogController.getBlogsPaginated, blogRoutesSchemas.getBlogsPaginatedRouteSchema)
    app.get(`${blogRoutePath}byslug/:slug`, blogController.getBlogBySlug, blogRoutesSchemas.getBlogsPaginatedRouteSchema)
    return app
}
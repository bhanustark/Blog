import type Elysia from "elysia";
import viewController from "../controllers/viewController";


export default async function (app: Elysia) {
     app.get("/", viewController.home)
     app.get("/:slug", viewController.post)
     app.get("/page/:pageNumber", viewController.page)
     app.get("/category/news/:category", viewController.category)
     return app
}
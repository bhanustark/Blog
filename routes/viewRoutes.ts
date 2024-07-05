import type Elysia from "elysia";
import viewController from "../controllers/viewController";

export default async function (app: Elysia) {
     app.get("/", viewController.home)
     app.get("/:slug", viewController.post)
     app.get("/page/:pageNumber", viewController.page)
     app.get("/category/:category", viewController.category)
     app.get("/category/:category/page/:pageNumber", viewController.category)
     return app
}
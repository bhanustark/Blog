import type Elysia from "elysia";
import categoryController from "../controllers/categoryController";
import categoryRoutesSchemas from "../routesSchemas/categoryRoutesSchemas"

export default async function (app: Elysia) {
    app.post("/api/category/add", categoryController.add, categoryRoutesSchemas.addCategoryRouteSchema)
    app.patch("/api/category/update", categoryController.update, categoryRoutesSchemas.updateCategoryRouteSchema)
    app.get("/api/category/getAll", categoryController.getAll)
    return app
}
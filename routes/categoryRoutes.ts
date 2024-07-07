import type Elysia from "elysia";
import categoryController from "../controllers/categoryController";
import categoryRoutesSchemas from "../routesSchemas/categoryRoutesSchemas"

const categoryRoutePath = "/api/category/"

export default async function (app: Elysia) {
    app.post(`${categoryRoutePath}add`, categoryController.add, categoryRoutesSchemas.addCategoryRouteSchema)
    app.patch(`${categoryRoutePath}update`, categoryController.update, categoryRoutesSchemas.updateCategoryRouteSchema)
    app.get(`${categoryRoutePath}getAll`, categoryController.getAll, categoryRoutesSchemas.getAllCategoryRouteSchema)
    return app
}
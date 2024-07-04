import type Elysia from "elysia";
import categoryController from "../controllers/categoryController";

export default async function (app: Elysia) {
    app.post("/api/category/add", categoryController.add)
    app.patch("/api/category/update", categoryController.update)
    app.get("/api/category/getAll", categoryController.getAll)

    return app
}
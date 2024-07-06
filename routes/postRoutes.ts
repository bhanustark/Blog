import type Elysia from "elysia";
import postController from "../controllers/postController";

export default async function (app: Elysia) {
    app.post("/api/post/add", postController.addPost)
    app.get("/api/post/get", postController.getPostsPaginated)
    return app
}
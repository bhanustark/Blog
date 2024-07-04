import postController from "../controllers/postController";

export default {
    add: postController.addPost,
    get: postController.getPostsPaginated
}
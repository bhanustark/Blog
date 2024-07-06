import { Post } from "../models/Post";
import type { Post as PostType } from "../models/Post";

export default {
    addPost: async ({ body }: { body: PostType }) => {
        const { title, content, categories, slug, image, author } = body;
        if (title && content && categories && slug && image && author) {
            const post = new Post({
                title, content, categories, slug, image, author
            })
            await post.save()
            return post
        } else {
            throw new Error("All fields are required")
        }
    },
    getPostsPaginated: async () => {
        const posts = await Post.find().limit(10)
        return posts
    },
}
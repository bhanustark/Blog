import { Post } from "../models/Post";
import type { Post as PostType } from "../models/Post";

export default {
    addPost: async ({ jwt, body }: { jwt: any, body: PostType }) => {
        const { title, description, keywords, content, categories, slug, image } = body;
        const authorId = jwt.user._id
        const post = new Post({
            title, content, categories, slug, image, author: authorId, description, keywords
        })
        await post.save()
        return post
    },
    getPostsPaginated: async () => {
        const posts = await Post.find().limit(10)
        return posts
    },
}
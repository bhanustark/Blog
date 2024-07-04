import { Post } from "../models/Post";

export default {
    addPost: async (req: Request) => {
        const { title, content, categories, slug, image, author } = await req.json()
        if (title && content && categories && slug && image && author) {
            const post = new Post({
                title, content, categories, slug, image, author
            })
            await post.save()
            return new Response(JSON.stringify(post))
        } else {
            return new Response("All fields are required")
        }
    },
    getPostsPaginated: async (req: Request) => {
        const posts = await Post.find().limit(10)
        return new Response("posts" + posts)
    },
}
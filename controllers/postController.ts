import { POST_PER_PAGE, POST_PER_PAGE_SITEMAP } from "../constant";
import { Category } from "../models/Category";
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
    getPostsPaginated: async ({ params }: { params?: { pageNumber?: string, category?: string } }) => {
        let query = Post.find()
        if (params?.category) {
            const categoryObject = await Category.findOne({ slug: params.category });
            if (categoryObject)
                query = Post.find({ categories: { $in: [categoryObject._id] } })
        }
        if (params?.pageNumber) {
            query = query.skip(POST_PER_PAGE * Number(params.pageNumber))
        }
        query = query.limit(POST_PER_PAGE).sort({ 'createdAt': -1 })
        return await query
    },
    getPostsForSitemap: async ({ params: { pageNumber } }: { params: { pageNumber: number } }) => {
        const posts = await Post.find().limit(POST_PER_PAGE_SITEMAP).skip(POST_PER_PAGE_SITEMAP * Number(pageNumber))
        return posts
    },
    getPostsForNewsSitemap: async ({ params: { pageNumber, category } }: { params: { pageNumber: number, category?: string } }) => {
        if (category) {
            const categoryObject = await Category.findOne({ slug: category });
            if (categoryObject) {
                const posts = await Post.find({ categories: { $in: [categoryObject._id] } }).sort({ 'createdAt': -1 }).limit(POST_PER_PAGE_SITEMAP).skip(POST_PER_PAGE_SITEMAP * Number(pageNumber))
                return posts
            } else {
                throw new Error("Unknown category")
            }
        }
        const posts = await Post.find().sort({ 'createdAt': -1 }).limit(POST_PER_PAGE_SITEMAP).skip(POST_PER_PAGE_SITEMAP * Number(pageNumber))
        return posts
    },
    getPostBySlug: async ({ params: { slug } }: { params: { slug: string } }) => {
        if (slug) {
            const post = await Post.findOne({ slug })
            return JSON.stringify(post)
        }
        throw new Error("slug is required")
    }
}
import { BLOG_PER_PAGE, BLOG_PER_PAGE_SITEMAP } from "../constant";
import { Category } from "../models/Category";
import { Blog } from "../models/Blog";
import type { Blog as BlogType } from "../models/Blog";

export default {
    addBlog: async ({ jwt, body }: { jwt: any, body: BlogType }) => {
        const { title, description, keywords, content, categories, slug, image } = body;
        const authorId = jwt.user._id
        const blog = new Blog({
            title, content, categories, slug, image, author: authorId, description, keywords
        })
        await blog.save()
        return blog
    },
    getBlogsPaginated: async ({ params }: { params?: { pageNumber?: string, category?: string } }) => {
        let query = Blog.find()
        if (params?.category) {
            const categoryObject = await Category.findOne({ slug: params.category });
            if (categoryObject)
                query = Blog.find({ categories: { $in: [categoryObject._id] } })
        }
        if (params?.pageNumber) {
            query = query.skip(BLOG_PER_PAGE * Number(params.pageNumber))
        }
        query = query.limit(BLOG_PER_PAGE).sort({ 'createdAt': -1 })
        return await query
    },
    getBlogsForSitemap: async ({ params: { pageNumber } }: { params: { pageNumber: number } }) => {
        const blogs = await Blog.find().limit(BLOG_PER_PAGE_SITEMAP).skip(BLOG_PER_PAGE_SITEMAP * Number(pageNumber))
        return blogs
    },
    getBlogsForNewsSitemap: async ({ params: { pageNumber, category } }: { params: { pageNumber: number, category?: string } }) => {
        if (category) {
            const categoryObject = await Category.findOne({ slug: category });
            if (categoryObject) {
                const blogs = await Blog.find({ categories: { $in: [categoryObject._id] } }).sort({ 'createdAt': -1 }).limit(BLOG_PER_PAGE_SITEMAP).skip(BLOG_PER_PAGE_SITEMAP * Number(pageNumber))
                return blogs
            } else {
                throw new Error("Unknown category")
            }
        }
        const blogs = await Blog.find().sort({ 'createdAt': -1 }).limit(BLOG_PER_PAGE_SITEMAP).skip(BLOG_PER_PAGE_SITEMAP * Number(pageNumber))
        return blogs
    },
    getBlogBySlug: async ({ params: { slug } }: { params: { slug: string } }) => {
        if (slug) {
            const blog = await Blog.findOne({ slug })
            return JSON.stringify(blog)
        }
        throw new Error("slug is required")
    }
}
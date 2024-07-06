import { postPerPage } from "../constant";
import { Category } from "../models/Category";
import { Post } from "../models/Post"
import HomePage from "../views/HomePage";
import layout from "../views/Layout";
import PostPage from "../views/PostPage";

const { APP_NAME } = Bun.env;

export default {
    home: async () => {
        const posts = await Post.find().sort({ 'updatedAt': -1 }).limit(postPerPage);
        const Component = await HomePage(posts)
        return layout(APP_NAME, "Nothing", Component)
    },
    page: async ({ params: { pageNumber } }: { params: { pageNumber: string } }) => {
        if (pageNumber) {
            const posts = await Post.find().sort({ 'updatedAt': -1 }).limit(postPerPage).skip(postPerPage * Number(pageNumber))
            const Component = await HomePage(posts, pageNumber)
            return layout(`${APP_NAME} - Page ${pageNumber}`, "Nothing", Component)
        } else {
            throw new Error("Page number is missing")
        }
    },
    category: async ({ params: { category, pageNumber } }: { params: { category: string, pageNumber: string } }) => {
        pageNumber = pageNumber ? pageNumber : "0";
        if (category) {
            const categoryObject = await Category.findOne({ slug: category });
            if (categoryObject) {
                const posts = await Post.find({ categories: { $in: [categoryObject._id] } }).sort({ 'updatedAt': -1 }).limit(postPerPage).skip(postPerPage * Number(pageNumber))
                const Component = await HomePage(posts, pageNumber, categoryObject)
                return layout(`${APP_NAME} - ${categoryObject.title}`, "Nothing", Component)
            } else {
                throw new Error("wrong category id")
            }
        } else {
            throw new Error("category is missing")
        }
    },
    post: async ({ params: { slug } }: { params: { slug: string } }) => {
        const post = await Post.findOne({ slug })
        if (post) {
            const Component = await PostPage(post)
            return layout(post?.title, post?.description, Component)
        } else {
            throw new Error("post not found")
        }
    }
}
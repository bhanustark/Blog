import { postPerPage } from "../constant";
import { Category } from "../models/Category";
import { Post } from "../models/Post"
import homePage from "../views/homePage";
import layout from "../views/layout";
import postPage from "../views/postPage";

export default {
    home: async () => {
        const posts = await Post.find().sort({ 'updatedAt': -1 }).limit(postPerPage);
        const Component = homePage(posts)
        return layout("Public App", "Nothing", Component)
    },
    page: async ({ params: { pageNumber } }: { params: { pageNumber: string } }) => {
        if (pageNumber) {
            const posts = await Post.find().sort({ 'updatedAt': -1 }).limit(postPerPage).skip(postPerPage * Number(pageNumber))
            const Component = homePage(posts, pageNumber)
            return layout(`Public App - Page ${pageNumber}`, "Nothing", Component)
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
                const Component = homePage(posts, pageNumber)
                return layout(`Public App - Page ${pageNumber}`, "Nothing", Component)
            } else {
                throw new Error("wrong category id")
            }
        } else {
            throw new Error("category is missing")
        }
    },
    post: async ({ params: { slug } }: { params: { slug: string } }) => {
        const post = await Post.findOne({ slug })
        const Component = postPage(post)
        return layout(post?.title, post?.description, Component)
    }
}
import { postPerPage } from "../constant";
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
            const posts = await Post.find().sort({'updatedAt': -1}).limit(postPerPage).skip(postPerPage * Number(pageNumber))
            const Component = homePage(posts, pageNumber)
            return layout(`Public App - Page ${pageNumber}`, "Nothing", Component)
        } else {
            throw new Error("Page number is missing")
        }
    },
    category: async ({ params: { category } }: { params: { category: string } }) => {
        if(category) {

        }
    },
    post: async ({ params: { slug } }: { params: { slug: string } }) => {
        const post = await Post.findOne({ slug })
        const Component = postPage(post)
        return layout(post?.title, post?.description, Component)
    }
}
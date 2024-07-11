import { DEFAULT_POST_IMAGE, POST_PER_PAGE, POST_PER_PAGE_SITEMAP } from "../constant";
import type { ISEOMeta } from "../interfaces/SEOInterfaces";
import { Category } from "../models/Category";
import { Post } from "../models/Post"
import { User } from "../models/User";
import postService from "../services/postService";
import { getRSSFeed } from "../utils/utils";
import HomePage from "../views/HomePage";
import layout from "../views/Layout";
import PostPage from "../views/PostPage";
import Sitemap from "../views/Sitemap";
import SitemapNews from "../views/SitemapNews";
import { Feed } from "feed";

const { APP_NAME, APP_ROOT, APP_CONTACT_EMAIL, APP_DESCRIPTION, APP_COPYRIGHT, DEFAULT_USER_ID } = Bun.env;

export default {
    home: async () => {
        const posts = await Post.find().sort({ 'updatedAt': -1 }).limit(POST_PER_PAGE);
        const Component = await HomePage(posts)
        const seo_meta: ISEOMeta = {
            title: APP_NAME,
        }
        return layout(seo_meta, Component)
    },
    page: async ({ params: { pageNumber } }: { params: { pageNumber: string } }) => {
        if (pageNumber) {
            const posts = await Post.find().sort({ 'updatedAt': -1 }).limit(POST_PER_PAGE).skip(POST_PER_PAGE * Number(pageNumber))
            const Component = await HomePage(posts, pageNumber)
            const seo_meta: ISEOMeta = {
                title: `${APP_NAME} - Page ${pageNumber}`,
            }
            return layout(seo_meta, Component)
        } else {
            throw new Error("Page number is missing")
        }
    },
    category: async ({ params: { category, pageNumber } }: { params: { category: string, pageNumber: string } }) => {
        pageNumber = pageNumber ? pageNumber : "0";
        if (category) {
            const categoryObject = await Category.findOne({ slug: category });
            if (categoryObject) {
                const posts = await Post.find({ categories: { $in: [categoryObject._id] } }).sort({ 'updatedAt': -1 }).limit(POST_PER_PAGE).skip(POST_PER_PAGE * Number(pageNumber))
                const Component = await HomePage(posts, pageNumber, categoryObject)
                const seo_meta: ISEOMeta = {
                    title: `${APP_NAME} - ${categoryObject.title}`,
                }
                return layout(seo_meta, Component)
            } else {
                throw new Error("wrong category id")
            }
        } else {
            throw new Error("category is missing")
        }
    },
    post: async ({ params: { slug } }: { params: { slug: string } }) => {
        const post = await postService.getPostBySlug(slug)
        if (post) {
            const Component = await PostPage(post)
            const seo_meta: ISEOMeta = {
                title: post?.title,
                description: post?.description,
                keywords: post?.keywords
            }
            return layout(seo_meta, Component)
        } else {
            throw new Error("post not found")
        }
    },
    sitemap: async ({ params: { pageNumber }, set }: { params: { pageNumber: string }, set: any }) => {
        const posts = await Post.find().limit(POST_PER_PAGE_SITEMAP).skip(POST_PER_PAGE_SITEMAP * Number(pageNumber))
        set.headers['content-type'] = "application/xml"
        return await Sitemap(posts)
    },
    sitemapNews: async ({ params: { pageNumber }, set }: { params: { pageNumber: string }, set: any }) => {
        const posts = await Post.find().sort({ 'updatedAt': -1 }).limit(POST_PER_PAGE_SITEMAP).skip(POST_PER_PAGE_SITEMAP * Number(pageNumber))
        set.headers['content-type'] = "application/xml"
        return await SitemapNews(posts)
    },
    getCategoryRSSFeed: async ({ params: { category }, set }: { params: { category: string }, set: any }) => {
        const categoryObject = await Category.findOne({ slug: category });
        const defaultUser = await User.findById(DEFAULT_USER_ID)
        if (categoryObject && defaultUser) {
            const posts = await Post.find({ categories: { $in: [categoryObject._id] } }).sort({ createdAt: -1 }).limit(POST_PER_PAGE_SITEMAP)
            const feed = getRSSFeed(posts, defaultUser, categoryObject)
            set.headers['content-type'] = "application/xml"
            return feed.rss2()
        } else {
            throw new Error("wrong category id")
        }
    },
    getRSSFeed: async ({ set }: { set: any }) => {
        const defaultUser = await User.findById(DEFAULT_USER_ID)
        if (defaultUser) {
            const posts = await Post.find().sort({ createdAt: -1 }).limit(POST_PER_PAGE_SITEMAP)
            const feed = getRSSFeed(posts, defaultUser)
            set.headers['content-type'] = "application/xml"
            return feed.rss2()
        } else {
            throw new Error("Default user is not set")
        }
    }
}
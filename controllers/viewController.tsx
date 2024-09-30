import { DEFAULT_BLOG_IMAGE, BLOG_PER_PAGE, BLOG_PER_PAGE_SITEMAP, RSS_FEED_PER_PAGE } from "../constant";
import type { ISEOMeta } from "../interfaces/SEOInterfaces";
import { Category } from "../models/Category";
import { Blog } from "../models/Blog"
import { User } from "../models/User";
import blogService from "../services/blogService";
import { getRSSFeed } from "../utils/utils";
import HomePage from "../views/HomePage";
import layout from "../views/Layout";
import BlogPage from "../views/BlogPage";
import Sitemap from "../views/Sitemap";
import SitemapNews from "../views/SitemapNews";
import { Feed } from "feed";

const { APP_NAME, APP_ROOT, APP_CONTACT_EMAIL, APP_DESCRIPTION, APP_COPYRIGHT, DEFAULT_USER_ID } = Bun.env;

export default {
    home: async () => {
        const blogs = await Blog.find().sort({ 'updatedAt': -1 }).limit(BLOG_PER_PAGE);
        const Component = await HomePage(blogs)
        const seo_meta: ISEOMeta = {
            title: APP_NAME,
        }
        return layout(seo_meta, Component)
    },
    page: async ({ params: { pageNumber } }: { params: { pageNumber: string } }) => {
        if (pageNumber) {
            const blogs = await Blog.find().sort({ 'updatedAt': -1 }).limit(BLOG_PER_PAGE).skip(BLOG_PER_PAGE * Number(pageNumber))
            const Component = await HomePage(blogs, pageNumber)
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
                const blogs = await Blog.find({ categories: { $in: [categoryObject._id] } }).sort({ 'updatedAt': -1 }).limit(BLOG_PER_PAGE).skip(BLOG_PER_PAGE * Number(pageNumber))
                const Component = await HomePage(blogs, pageNumber, categoryObject)
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
    blog: async ({ params: { slug } }: { params: { slug: string } }) => {
        const blog = await blogService.getBlogBySlug(slug)
        if (blog) {
            const Component = await BlogPage(blog)
            const seo_meta: ISEOMeta = {
                title: blog?.title,
                description: blog?.description,
                keywords: blog?.keywords
            }
            return layout(seo_meta, Component)
        } else {
            throw new Error("blog not found")
        }
    },
    sitemap: async ({ params: { pageNumber }, set }: { params: { pageNumber: string }, set: any }) => {
        const blogs = await Blog.find().limit(BLOG_PER_PAGE_SITEMAP).skip(BLOG_PER_PAGE_SITEMAP * Number(pageNumber))
        set.headers['content-type'] = "application/xml"
        return await Sitemap(blogs)
    },
    sitemapNews: async ({ params: { pageNumber }, set }: { params: { pageNumber: string }, set: any }) => {
        const blogs = await Blog.find().sort({ 'updatedAt': -1 }).limit(BLOG_PER_PAGE_SITEMAP).skip(BLOG_PER_PAGE_SITEMAP * Number(pageNumber))
        set.headers['content-type'] = "application/xml"
        return await SitemapNews(blogs)
    },
    getCategoryRSSFeed: async ({ params: { category }, set }: { params: { category: string }, set: any }) => {
        const categoryObject = await Category.findOne({ slug: category });
        const defaultUser = await User.findById(DEFAULT_USER_ID)
        if (categoryObject && defaultUser) {
            const blogs = await Blog.find({ categories: { $in: [categoryObject._id] } }).sort({ createdAt: -1 }).limit(RSS_FEED_PER_PAGE)
            const feed = getRSSFeed(blogs, defaultUser, categoryObject)
            set.headers['content-type'] = "application/xml"
            return feed.rss2()
        } else {
            throw new Error("wrong category id")
        }
    },
    getRSSFeed: async ({ set }: { set: any }) => {
        const defaultUser = await User.findById(DEFAULT_USER_ID)
        if (defaultUser) {
            const blogs = await Blog.find().sort({ createdAt: -1 }).limit(RSS_FEED_PER_PAGE)
            const feed = getRSSFeed(blogs, defaultUser)
            set.headers['content-type'] = "application/xml"
            return feed.rss2()
        } else {
            throw new Error("Default user is not set")
        }
    }
}
import { CACHE_MAX_BLOG_BY_SLUG, CACHE_BLOG_BY_SLUG_TTL } from "../constant"
import { Blog, type Blog as BlogType } from "../models/Blog"

export const BlogService = class {
    // ONE DISADVANTAGE of this cache this cache is not limiting blogs which is not expired;
    // CAN BE OUT OF RAM, When too much traffic on different blogs;
    private blogsWithSlugs: Record<string, BlogType>
    //Value is timestamp and key is slug, which is key of blogsWithSlugs item
    private blogsWithSlugsExpiry: Record<string, number>
    private blogsWithSlugsCount: number
    constructor() {
        this.blogsWithSlugs = {}
        this.blogsWithSlugsExpiry = {}
        // Using slugCounter to count size of Object because Object.keys(object).length have time complexity of O(n)
        // And the check of blogsWithSlugsCount is running on every getBlogBySlug() request
        this.blogsWithSlugsCount = 0
    }
    getBlogBySlug = async (slug: string): Promise<BlogType | null> => {
        if (this.blogsWithSlugsCount > CACHE_MAX_BLOG_BY_SLUG) {
            await this.deleteExpiredBlogsWithSlugs()
        }
        const blogInCache = this.blogsWithSlugs[slug]
        if (blogInCache) {
            //Increasing expiry time of existing cached blog, which is frequently fetched
            this.blogsWithSlugsExpiry[blogInCache.slug] = Date.now() + CACHE_BLOG_BY_SLUG_TTL
            return blogInCache
        } else {
            const blog = await Blog.findOne({ slug, isDeleted: false })
            if (blog) {
                this.blogsWithSlugs[blog.slug] = blog
                this.blogsWithSlugsExpiry[blog.slug] = Date.now() + CACHE_BLOG_BY_SLUG_TTL
                this.blogsWithSlugsCount += 1;
                return blog
            } else {
                return null;
            }
        }
    }
    deleteExpiredBlogsWithSlugs = async () => {
        const currentTimestamp = Date.now()
        const expiredEntries = Object.entries(this.blogsWithSlugsExpiry).filter(([slug, timestamp]) => Number(timestamp) < currentTimestamp)
        this.blogsWithSlugsCount -= expiredEntries.length;
        expiredEntries.map(([slug, timestamp]) => {
            delete this.blogsWithSlugs[slug]
            delete this.blogsWithSlugsExpiry[slug]
        })
    }
    expireBlogBySlug = async (slug: string) => {
        delete this.blogsWithSlugs[slug]
        delete this.blogsWithSlugsExpiry[slug]
        this.blogsWithSlugsCount += 1;
    }
}

const blogService = new BlogService()

export default blogService;
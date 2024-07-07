import { CACHE_MAX_POST_BY_SLUG, CACHE_POST_BY_SLUG_TTL } from "../constant"
import { Post, type Post as PostType } from "../models/Post"

export const PostService = class {
    // ONE DISADVANTAGE of this cache this cache is not limiting posts which is not expired;
    // CAN BE OUT OF RAM, When too much traffic on different posts;
    private postsWithSlugs: Record<string, PostType>
    //Value is timestamp and key is slug, which is key of postsWithSlugs item
    private postsWithSlugsExpiry: Record<string, number>
    private postsWithSlugsCount: number
    constructor() {
        this.postsWithSlugs = {}
        this.postsWithSlugsExpiry = {}
        // Using slugCounter to count size of Object because Object.keys(object).length have time complexity of O(n)
        // And the check of postsWithSlugsCount is running on every getPostBySlug() request
        this.postsWithSlugsCount = 0
    }
    getPostBySlug = async (slug: string): Promise<PostType | null> => {
        if (this.postsWithSlugsCount > CACHE_MAX_POST_BY_SLUG) {
            await this.deleteExpiredPostsWithSlugs()
        }
        const postInCache = this.postsWithSlugs[slug]
        if (postInCache) {
            //Increasing expiry time of existing cached post, which is frequently fetched
            this.postsWithSlugsExpiry[postInCache.slug] = Date.now() + CACHE_POST_BY_SLUG_TTL
            return postInCache
        } else {
            const post = await Post.findOne({ slug })
            if (post) {
                this.postsWithSlugs[post.slug] = post
                this.postsWithSlugsExpiry[post.slug] = Date.now() + CACHE_POST_BY_SLUG_TTL
                this.postsWithSlugsCount += 1;
                return post
            } else {
                return null;
            }
        }
    }
    deleteExpiredPostsWithSlugs = async () => {
        const currentTimestamp = Date.now()
        const expiredEntries = Object.entries(this.postsWithSlugsExpiry).filter(([slug, timestamp]) => Number(timestamp) < currentTimestamp)
        this.postsWithSlugsCount -= expiredEntries.length;
        expiredEntries.map(([slug, timestamp]) => {
            delete this.postsWithSlugs[slug]
            delete this.postsWithSlugsExpiry[slug]
        })
    }
}

const postService = new PostService()

export default postService;
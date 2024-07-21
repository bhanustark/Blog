export const POST_PER_PAGE = 10
export const RSS_FEED_PER_PAGE = 50
export const POST_PER_PAGE_SITEMAP = 1000

//Cache post by slug in memory for one hour
export const CACHE_POST_BY_SLUG_TTL = 60 * 60 * 1000;

//Cache max posts in post by slug
export const CACHE_MAX_POST_BY_SLUG = 1000;

export const DEFAULT_POST_IMAGE = "/public/default.webp"

export const DOCUMENTATION_TAGS = {
    POST: { name: 'Post', description: 'Post endpoints' },
    USER: { name: 'User', description: 'User endpoints' },
    CATEGORY: { name: 'Category', description: 'Category endpoints' }
}

export const DASH_ROUTES = [
    {
        slug: "/dash",
        title: "Dashboard"
    },
    {
        slug: "/dash/posts",
        title: "Posts"
    },
    {
        slug: "/dash/settings",
        title: "Settings"
    }
]
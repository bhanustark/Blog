export const BLOG_PER_PAGE = 10
export const RSS_FEED_PER_PAGE = 50
export const BLOG_PER_PAGE_SITEMAP = 1000

//Cache blog by slug in memory for one hour
export const CACHE_BLOG_BY_SLUG_TTL = 60 * 60 * 1000;

//Cache max blogs in blog by slug
export const CACHE_MAX_BLOG_BY_SLUG = 1000;

export const DEFAULT_BLOG_IMAGE = "/public/default.webp"

export const DOCUMENTATION_TAGS = {
    BLOG: { name: 'Blog', description: 'Blog endpoints' },
    USER: { name: 'User', description: 'User endpoints' },
    CATEGORY: { name: 'Category', description: 'Category endpoints' }
}
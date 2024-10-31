import type { Blog } from "../models/Blog";

export default async function Sitemap(blogs: Blog[]) {
    const { APP_ROOT } = Bun.env
    return (
        `<?xml version="1.0" encoding="UTF-8" ?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${blogs.map(blog =>
                    `<url>
                        <loc>${APP_ROOT}/${blog.slug}</loc>
                        <lastmod>${blog.updatedAt.toISOString()}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>0.8</priority>
                    </url>`
                ).join("")}
             </urlset> `
    )
}
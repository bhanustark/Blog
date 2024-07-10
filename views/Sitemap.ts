import type { Post } from "../models/Post";

export default async function Sitemap(posts: Post[]) {
    const { APP_ROOT } = Bun.env
    return (
        `<?xml version="1.0" encoding="UTF-8" ?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts.map(post =>
                    `<url>
                        <loc>${APP_ROOT}/${post.slug}</loc>
                        <lastmod>${post.createdAt.toISOString()}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>0.8</priority>
                    </url>`
                ).join("")}
             </urlset> `
    )
}
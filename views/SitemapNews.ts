import type { Post } from "../models/Post";

export default async function SitemapNews(posts: Post[]) {
    const { APP_ROOT, APP_NAME } = Bun.env
    return (
        `<?xml version="1.0" encoding="UTF-8" ?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
                ${posts.map(post =>
            `<url>
                        <loc>${APP_ROOT}/${post.slug}</loc>
                        <lastmod>${post.createdAt.toISOString()}</lastmod>
                        <news:news>
                            <news:publication>
                                <news:name>${APP_NAME}</news:name>
                                <news:language>en</news:language>
                            </news:publication>
                            <news:publication_date>${post.createdAt.toISOString()}</news:publication_date>
                            <news:title>
                                <![CDATA[ ${post.title} ]]>
                            </news:title>
                            ${post?.keywords ?
                            `    <news:keywords>
                                    <![CDATA[ ${post.keywords} ]]>
                                </news:keywords>`
                            : ''}
                        </news:news>
                    </url>`
        ).join("")}
             </urlset> `
    )
}
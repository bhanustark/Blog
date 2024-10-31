import type { Blog } from "../models/Blog";

export default async function SitemapNews(blogs: Blog[]) {
    const { APP_ROOT, APP_NAME } = Bun.env
    return (
        `<?xml version="1.0" encoding="UTF-8" ?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
                ${blogs.map(blog =>
            `<url>
                        <loc>${APP_ROOT}/${blog.slug}</loc>
                        <lastmod>${blog.updatedAt.toISOString()}</lastmod>
                        <news:news>
                            <news:publication>
                                <news:name>${APP_NAME}</news:name>
                                <news:language>en</news:language>
                            </news:publication>
                            <news:publication_date>${blog.createdAt.toISOString()}</news:publication_date>
                            <news:title>
                                <![CDATA[ ${blog.title} ]]>
                            </news:title>
                            ${blog?.keywords ?
                            `    <news:keywords>
                                    <![CDATA[ ${blog.keywords} ]]>
                                </news:keywords>`
                            : ''}
                        </news:news>
                    </url>`
        ).join("")}
             </urlset> `
    )
}
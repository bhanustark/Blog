import { DEFAULT_BLOG_IMAGE } from "../constant";
import type { Blog } from "../models/Blog";

export default function BlogPage(blog: Blog) {
    return (
        <div class="flex justify-center items-center flex-col">
            <object data={blog?.image ? blog?.image : DEFAULT_BLOG_IMAGE} type="image/webp" class="object-cover max-w-5xl w-full rounded-lg">
                <img src="/public/default.webp" alt={blog?.title} class="object-cover max-w-5xl w-full rounded-lg" />
            </object>
            <div class="hero">
                <div class="hero-content">
                    <div class="max-w-2xl">
                        <h1 class="text-lg font-bold">{blog?.title}</h1>
                        <p>Bloged on {new Date(blog.createdAt).toDateString()}</p>
                        {blog?.content}
                    </div>
                </div>
            </div>
        </div>
    )
}
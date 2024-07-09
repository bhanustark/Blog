import { DEFAULT_POST_IMAGE } from "../constant";
import type { Post } from "../models/Post";

export default function PostPage(post: Post) {
    return (
        <div class="flex justify-center items-center flex-col">
            <object data={post?.image ? post?.image : DEFAULT_POST_IMAGE} type="image/webp" class="object-cover max-w-5xl w-full rounded-lg">
                <img src="/public/default.webp" alt={post?.title} class="object-cover max-w-5xl w-full rounded-lg" />
            </object>
            <div class="hero">
                <div class="hero-content">
                    <div class="max-w-2xl">
                        <h1 class="text-lg font-bold">{post?.title}</h1>
                        <p>Posted on {new Date(post.createdAt).toDateString()}</p>
                        {post?.content}
                    </div>
                </div>
            </div>
        </div>
    )
}
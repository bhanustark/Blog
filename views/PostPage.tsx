import type { Post } from "../models/Post";

export default function PostPage(post: Post) {
    return (
        <div class="flex justify-center items-center flex-col">
            <img src={post?.image ? post?.image : "/public/default.webp"} alt={post?.title} class="object-cover max-w-5xl w-full rounded-lg" />
            <div class="hero">
                <div class="hero-content">
                    <div class="max-w-2xl">
                        <h1 class="text-3xl font-bold">{post?.title}</h1>
                        {post?.content}
                    </div>
                </div>
            </div>
        </div>
    )
}
import { defaultPostImage } from "../constant";
import type { Post } from "../models/Post";

export default function PostPage(post: Post) {
    return (
        <div class="flex justify-center items-center flex-col">
            <img src={post?.image ? post?.image : defaultPostImage} alt={post?.title} class="object-cover max-w-5xl w-full rounded-lg" />
            <div class="hero">
                <div class="hero-content">
                    <div class="max-w-2xl">
                        <h1 class="text-xl font-bold">{post?.title}</h1>
                        <p>Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                        {post?.content}
                    </div>
                </div>
            </div>
        </div>
    )
}
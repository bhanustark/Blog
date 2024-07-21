import type { Post } from "../../models/Post"


const PostsPage = (posts: Post[]) => (
    <div>
        {posts.map((post) => (
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={post?.image ? post.image : ""}
                        alt={post.title} />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{post.title}</h2>
                    <p>{post?.description}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Edit</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

export default PostsPage
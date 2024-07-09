import { DEFAULT_POST_IMAGE } from "../constant"
import type { Category } from "../models/Category"
import type { Post } from "../models/Post"

const HomePage = (posts: Post[], pageNumber?: string, category?: Category) => {
    const prevPageLink = `/page/${Number(pageNumber) - 1}`
    const nextPageLink = `/page/${(Number(pageNumber) || 0) + 1}`
    const currentPageTitle = `Page ${Number(pageNumber) || 0}`
    let prevPageLinkCategory, nextPageLinkCategory
    if (category) {
        const categoryPrefix = `/category/${category.slug}`
        prevPageLinkCategory = categoryPrefix + prevPageLink
        nextPageLinkCategory = categoryPrefix + nextPageLink
    }
    return (
        <div class="flex flex-col justify-center items-center">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: "20px", marginTop: "20px" }}>
                {posts?.map(post => (
                    <a href={`/${post?.slug}`} class="p-4">
                        <div class="card bg-base-100 w-auto max-w-96 h-96 shadow-xl">
                            <figure>
                                <object data={post?.image ? post?.image : DEFAULT_POST_IMAGE} type="image/webp" class="h-60 w-[100%]">
                                    <img
                                        height={300}
                                        width={400}
                                        class="h-60 w-[100%]"
                                        src="/public/default.webp"
                                        alt={post?.title} />
                                </object>
                            </figure>
                            <div class="card-body">
                                <h2 class="card-title text-base truncateText">{post?.title}</h2>
                                <p>Posted on {new Date(post.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div class="join my-4">
                {Number(pageNumber) ?
                    <a class="join-item btn" href={category ? prevPageLinkCategory : prevPageLink}>«</a> : <></>
                }
                <button class="join-item btn">{currentPageTitle}</button>
                <a class="join-item btn" href={category ? nextPageLinkCategory : nextPageLink}>»</a>
            </div>
        </div>
    )
}

export default HomePage
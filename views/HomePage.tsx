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
                    <a href={`/${post?.slug}`}>
                        <div class="card card-compact bg-base-100 w-96 h-96 shadow-xl">
                            <figure>
                                <img
                                    height={300}
                                    width={400}
                                    class="h-60 w-[100%]"
                                    src={post?.image ? post?.image : "/public/default.webp"}
                                    alt={post?.title} />
                            </figure>
                            <div class="card-body">
                                <h2 class="card-title">{(post?.title?.length > 100) ? post?.title?.slice(0, 100 - 1) + '&hellip;' : post?.title}</h2>
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
import { DEFAULT_BLOG_IMAGE } from "../constant"
import type { Category } from "../models/Category"
import type { Blog } from "../models/Blog"

const HomePage = (blogs: Blog[], pageNumber?: string, category?: Category) => {
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: "10px", marginTop: "10px" }}>
                {blogs?.map(blog => (
                    <a href={`/${blog?.slug}`} class="p-2">
                        <div class="card w-auto max-w-96 h-92 shadow-xl bg-base-200">
                            <figure>
                                <object data={blog?.image ? blog?.image : DEFAULT_BLOG_IMAGE} type="image/webp" class="h-60 w-[100%]">
                                    <img
                                        height={300}
                                        width={400}
                                        class="h-60 w-[100%]"
                                        src="/public/default.webp"
                                        alt={blog?.title} />
                                </object>
                            </figure>
                            <div class="px-4 py-2 gap-0">
                                <h2 class="card-title text-base truncateText">{blog?.title}</h2>
                                <p>Bloged on {new Date(blog.createdAt).toDateString()}</p>
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
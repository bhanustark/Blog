const homePage = (posts, pageNumber) => (
    <div class="flex flex-col justify-center items-center">
        <h1>HomePage</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: "20px" }}>
            {posts?.map(post => (
                <a href={`/${post?.slug}`}>
                    <div class="card card-compact bg-base-100 w-96 h-96 shadow-xl">
                        <figure>
                            <img
                                height={300}
                                width={400}
                                class="h-60 w-[100%]"
                                src={post?.image}
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
                <a class="join-item btn" href={`/page/${Number(pageNumber) - 1}`}>«</a>: <></>
            }
            <button class="join-item btn">Page {Number(pageNumber) || 0}</button>
            <a class="join-item btn" href={`/page/${(Number(pageNumber) || 0) + 1}`}>»</a>
        </div>
    </div>
)

export default homePage
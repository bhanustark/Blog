import categoryService from "../services/categoryService";
const { APP_NAME } = Bun.env;

const Navbar = async () => {
    const categories = await categoryService.getCategories()
    return (
        <div class="navbar bg-base-200 sticky top-0 z-10">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex={0} role="button" class="btn btn-ghost 2xl:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabindex={0}
                        class="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {categories.map(category => (
                            <li><a href={`/category/${category.slug}/`}>{category.title}</a></li>
                        ))}
                    </ul>
                </div>
                <a href="/" class="btn btn-ghost text-xl">{APP_NAME}</a>
            </div>
            <div class="navbar-center hidden 2xl:flex">
                <ul class="menu menu-horizontal px-1">
                    {categories.map(category => (
                        <li><a href={`/category/${category.slug}/`}>{category.title}</a></li>
                    ))}
                </ul>
            </div>
            <div class="navbar-end">
                <a class="btn" href="/login">Account</a>
            </div>
        </div>
    )
}

export default Navbar
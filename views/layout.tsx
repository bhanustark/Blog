import { categories } from "../constant"

const style = `
    p {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }
`
const layout = (title, description, Component) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
            <link
                href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
                rel="stylesheet"
                type="text/css"
            />
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{style}</style>
        </head>
        <body>
            <div class="navbar bg-base-100">
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
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {categories.map(category => (
                                <li><a href={`/category/${category.slug}/`}>{category.title}</a></li>
                            ))}
                        </ul>
                    </div>
                    <a href="/" class="btn btn-ghost text-xl">Public App</a>
                </div>
                <div class="navbar-center hidden 2xl:flex">
                    <ul class="menu menu-horizontal px-1">
                        {categories.map(category => (
                            <li><a href={`/category/${category.slug}/`}>{category.title}</a></li>
                        ))}
                    </ul>
                </div>
                <div class="navbar-end">
                    <button className="btn">About</button>
                </div>
            </div>
            {Component}
            <footer className="footer footer-center rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © ${new Date().getFullYear()} - All right reserved by Public App</p>
                </aside>
            </footer>
        </body>
    </html>
)

export default layout
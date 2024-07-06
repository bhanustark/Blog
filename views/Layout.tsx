import Footer from "./Footer"
import Navbar from "./Navbar"

const style = `
    p {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }
    .truncateText {
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 2 !important;
                line-clamp: 2 !important; 
        -webkit-box-orient: vertical !important;
    }
`
const Layout = (title: string | undefined, description: string | undefined | null, Component: string) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
            {description ? <meta name="description" content={description} /> : <></>}
            <link
                href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
                rel="stylesheet"
                type="text/css"
            />
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{style}</style>
        </head>
        <body>
            <Navbar />
            {Component}
            <Footer />
        </body>
    </html>
)

export default Layout
import type { ISEOMeta } from "../interfaces/SEOInterfaces"
import Footer from "./Footer"
import Navbar from "./Navbar"

const { GOOGLE_ANALYTICS_CODE } = Bun.env

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
const googleAnalyticsJSString = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GOOGLE_ANALYTICS_CODE}');
`
const Layout = (meta: ISEOMeta, Component: string) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{meta?.title}</title>
            {meta?.description ? <meta name="description" content={meta.description} /> : <></>}
            {meta?.keywords ? <meta name="keywords" content={meta.keywords} /> : <></>}
            <link
                href="https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css"
                rel="stylesheet"
                type="text/css"
            />
            <script src="https://cdn.tailwindcss.com"></script>
            {GOOGLE_ANALYTICS_CODE ?
                <>
                    <style>{style}</style>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_CODE}`}></script>
                    <script>
                        {googleAnalyticsJSString}
                    </script>
                </>
                : <></>
            }
        </head>
        <body>
            <Navbar />
            {Component}
            <Footer />
        </body>
    </html>
)

export default Layout
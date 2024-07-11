import type Elysia from "elysia";
import viewController from "../controllers/viewController";
const { ANDROID_APP_ID, ANDROID_APP_SHA256, APP_ROOT, SITEMAP_TOTAL_PAGES } = Bun.env
export default async function (app: Elysia) {
     if (ANDROID_APP_ID && ANDROID_APP_SHA256) {
          app.get("/.well-known/assetlinks.json", () => (
               [
                    {
                         "relation": ["delegate_permission/common.handle_all_urls"],
                         "target": {
                              "namespace": "android_app",
                              "package_name": ANDROID_APP_ID,
                              "sha256_cert_fingerprints":
                                   [ANDROID_APP_SHA256]
                         }
                    }
               ]
          ))
     }
     app.get("/robots.txt", 
`User-agent: *
${new Array(Number(SITEMAP_TOTAL_PAGES)).fill(0).map((v,i) => `Sitemap: ${APP_ROOT}/sitemaps/${i}/sitemap.xml`).join("\n")}
Sitemap: ${APP_ROOT}/sitemaps-news/0/sitemap.xml`)
     app.get("/", viewController.home)
     app.get("/:slug", viewController.post)
     app.get("/page/:pageNumber", viewController.page)
     app.get("/category/:category", viewController.category)
     app.get("/category/:category/page/:pageNumber", viewController.category)
     app.get("/sitemaps/:pageNumber/sitemap.xml", viewController.sitemap)
     app.get("/sitemaps-news/:pageNumber/sitemap.xml", viewController.sitemapNews)
     app.get("/category/:category/feed/gn", viewController.getCategoryRSSFeed)
     app.get("/feed/gn", viewController.getRSSFeed)
     return app
}
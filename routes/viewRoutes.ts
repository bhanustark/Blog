import type Elysia from "elysia";
import viewController from "../controllers/viewController";
const { ANDROID_APP_ID, ANDROID_APP_SHA256 } = process.env
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
     app.get("/", viewController.home)
     app.get("/:slug", viewController.post)
     app.get("/page/:pageNumber", viewController.page)
     app.get("/category/:category", viewController.category)
     app.get("/category/:category/page/:pageNumber", viewController.category)
     return app
}
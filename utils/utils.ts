import { Feed } from "feed";
import type { Post } from "../models/Post";
import type { Category } from "../models/Category";
import type { User } from "../models/User";
import { DEFAULT_POST_IMAGE } from "../constant";

const { APP_NAME, APP_ROOT, APP_CONTACT_EMAIL, APP_DESCRIPTION, APP_COPYRIGHT, DEFAULT_USER_ID } = Bun.env;

export const getRSSFeed = (posts: Post[], defaultUser: User, categoryObject?: Category) => {
    if (APP_NAME && APP_ROOT && APP_COPYRIGHT) {
        const feed = new Feed({
            title: APP_NAME,
            description: APP_DESCRIPTION,
            id: APP_ROOT,
            link: APP_ROOT,
            language: "en",
            image: `${APP_ROOT}/LOGO_WEB_LIGHT.png`,
            favicon: `${APP_ROOT}/favicon.ico`,
            copyright: APP_COPYRIGHT,
            updated: new Date(), // optional, default = today
            feedLinks: {
                atom: `${APP_ROOT}/feed`
            },
            author: {
                name: APP_NAME,
                email: APP_CONTACT_EMAIL,
                link: `${APP_ROOT}/profile/${DEFAULT_USER_ID}`
            }
        })

        posts.map(post => {
            feed.addItem({
                title: post.title,
                id: `${APP_ROOT}/${post.slug}`,
                link: `${APP_ROOT}/${post.slug}`,
                description: post.description ? post.description : APP_DESCRIPTION,
                content: post.content,
                author: [
                    {
                        name: defaultUser?.name || APP_NAME,
                        email: APP_CONTACT_EMAIL,
                        link: `${APP_ROOT}/profile/${DEFAULT_USER_ID}`
                    }
                ],
                contributor: [
                    {
                        name: defaultUser?.name || APP_NAME,
                        email: APP_CONTACT_EMAIL,
                        link: `${APP_ROOT}/profile/${DEFAULT_USER_ID}`
                    }
                ],
                date: new Date(post.createdAt),
                image: post.image ? post.image : `${APP_ROOT}/${DEFAULT_POST_IMAGE}`
            });
        });

        if (categoryObject) {
            feed.addCategory(categoryObject.title);
        } else {
            feed.addCategory("News")
        }

        feed.addContributor({
            name: APP_NAME,
            email: APP_CONTACT_EMAIL,
            link: APP_ROOT
        });

        return feed
    } else {
        throw new Error("Cannot generate feed")
    }
}
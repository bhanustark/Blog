import * as mongoose from "mongoose"
import { Elysia, t } from 'elysia';
import { html } from "@elysiajs/html";
import { staticPlugin } from '@elysiajs/static'
import viewRoutes from "./routes/viewRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import blogRoutes from "./routes/blogtRoutes";
import { swagger } from '@elysiajs/swagger'
import userRoutes from "./routes/userRoutes";
import { jwt } from '@elysiajs/jwt'
import { DOCUMENTATION_TAGS } from "./constant";

const app = new Elysia();
const { SECRET, MONGO_URI, MONGO_URI_DEV, ENABLE_DOCUMENTATION } = Bun.env
const PORT = Bun.env.PORT || 3000;

if (!SECRET) {
    throw new Error("SECRET is required for jwt. please add SECRET in .env")
}

try {
    if (MONGO_URI) {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to mongoose")
    } else {
        throw new Error("MONGO_URI not defined in .env")
    }
} catch (error) {
    if (MONGO_URI_DEV) {
        await mongoose.connect(MONGO_URI_DEV);
    } else {
        throw new Error("MONGO_URI_DEV not defined in .env")
    }
}

if (ENABLE_DOCUMENTATION) {
    app.use(swagger({
        documentation: {
            info: {
                title: 'Blog Documentation',
                version: '1.0.0'
            },
            tags: Object.values(DOCUMENTATION_TAGS)
        }
    }))
}
app.use(jwt({
    name: 'jwt',
    secret: SECRET,
    exp: '7d'
}))
app.use(html())
app.use(staticPlugin())

app.use(userRoutes)
app.use(blogRoutes)
app.use(categoryRoutes)
app.use(viewRoutes)


app.listen(PORT, () => {
    console.log(`🦊 Blog is running at ${app.server?.hostname}:${PORT}`);
});
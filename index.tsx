import * as mongoose from "mongoose"
import { Elysia, t } from 'elysia';
import { html } from "@elysiajs/html";
import { staticPlugin } from '@elysiajs/static'
import viewRoutes from "./routes/viewRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import postRoutes from "./routes/postRoutes";
const app = new Elysia();
const { MONGO_URI, MONGO_URI_DEV } = Bun.env
const PORT = Bun.env.PORT || 3000;

app.use(html())
app.use(staticPlugin())

try {
    if (MONGO_URI) {
        await mongoose.connect(MONGO_URI);
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

app.use(postRoutes)
app.use(categoryRoutes)
app.use(viewRoutes)


app.listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
});
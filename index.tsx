import * as mongoose from "mongoose"
import userController from "./controllers/userController";
import postController from "./controllers/postController";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import viewController from "./controllers/viewController";
import { Elysia, t } from 'elysia';
import { html } from "@elysiajs/html";
import viewRoutes from "./routes/viewRoutes";
import categoryRoutes from "./routes/categoryRoutes";
const app = new Elysia();

const PORT = process.env.PORT || 3000;

app.use(html())

try {
    await mongoose.connect(Bun.env.MONGO_URI);
} catch (error) {
    await mongoose.connect(Bun.env.MONGO_URI_DEV);
}

app.use(categoryRoutes)
app.use(viewRoutes)


app.listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
});
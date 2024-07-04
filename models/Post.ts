import * as mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    keywords: {
        type: String,
    },
    description: {
        type: String,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        index: true
    }],
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true
    }
}, {
    timestamps: true
})

export type Post = mongoose.InferSchemaType<typeof PostSchema>;
export const Post = mongoose.model('Post', PostSchema);

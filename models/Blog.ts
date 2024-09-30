import * as mongoose from "mongoose"

const BlogCommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: String,
    },
    keywords: {
        type: String,
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    media: {
        type: String,
    },
    mediaType: {
        type: String,
        enum: ['photo', 'video', 'image']
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [BlogCommentSchema],
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    isDraft: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export type Blog = mongoose.InferSchemaType<typeof BlogSchema>;
export const Blog = mongoose.model('Blog', BlogSchema);
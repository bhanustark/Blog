import * as mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
})

export type Category = mongoose.InferSchemaType<typeof CategorySchema>;
export const Category = mongoose.model('Category', CategorySchema);

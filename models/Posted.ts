import * as mongoose from "mongoose"

const PostedSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    }
})

export type Posted = mongoose.InferSchemaType<typeof PostedSchema>;
export const Posted = mongoose.model('Posted', PostedSchema);

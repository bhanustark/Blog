import * as mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({
    sitemap: {
        type: String,
        unique: true,
    },
    posts: {
        type: Number,
    },
    categories: [{
        type: Number
    }]
})

export type Config = mongoose.InferSchemaType<typeof ConfigSchema>;
export const Config = mongoose.model('Config', ConfigSchema);
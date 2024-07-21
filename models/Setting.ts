import * as mongoose from "mongoose"

const SettingSchema = new mongoose.Schema({
    app_name: {
        type: String,
        required: true,
    },
    app_root: {
        type: String,
        required: true,
    },
    app_contact_email: {
        type: String,
    },
    app_description: {
        type: String,
    },
    default_user_id: {
        type: String,
    },
    sitemap_total_pages: {
        type: Number
    },
    android_app_id: {
        type: String,
    },
    android_app_sha256: {
        type: String
    },
    google_analytics_code: {
        type: String
    }
}, {
    timestamps: true
})

export type Category = mongoose.InferSchemaType<typeof SettingSchema>;
export const Category = mongoose.model('Category', SettingSchema);

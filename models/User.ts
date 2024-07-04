import * as mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    bio: {
        type: String
    }
}, {
    timestamps: true
})

export type User = mongoose.InferSchemaType<typeof UserSchema>;
export const User = mongoose.model('User', UserSchema);

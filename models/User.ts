import * as mongoose from "mongoose"

export const USERFIELDS = {
    ID: "_id",
    NAME: "name",
    EMAIL: "email",
    PASSWORD: "password",
    BIO: "bio",
    ROLE: "role"
}

export enum UserRole {
    Admin = "admin",
    User = "user"
}

export const jwtFields = [USERFIELDS.ID, USERFIELDS.EMAIL, USERFIELDS.ROLE]
export const publicFields = [USERFIELDS.ID, USERFIELDS.NAME, USERFIELDS.BIO]

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
    },
    role: {
        type: String,
        enum: [UserRole.Admin, UserRole.User],
        default: UserRole.User,
    }
}, {
    timestamps: true
})

export type User = mongoose.InferSchemaType<typeof UserSchema>;
export const User = mongoose.model('User', UserSchema);

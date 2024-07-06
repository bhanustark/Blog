import { User } from "../models/User";
import type { User as UserType } from "../models/User";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default {
    signup: async ({ body }: { body: UserType }) => {
        const { email, name, password } = body
        if (name && email && password) {
            const hash = bcrypt.hashSync(password, saltRounds);
            const user = new User({
                email: 'bhanustark1@gmail.com',
                password: hash,
                name: 'Bhanu Stark'
            });
            await user.save(); // saves to the database
            return user;
        } else {
            throw new Error("Fields email, name, password are required!")
        }
    },
    login: async ({ body }: { body: { email: string; password: string; } }) => {

    },
    getUserById: async ({ params: { userId } }: { params: { userId: string } }) => {

    }
}
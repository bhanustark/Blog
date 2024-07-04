import { User } from "../models/User";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default {
    signup: async (req: Request) => {
        const hash = bcrypt.hashSync("Hello", saltRounds);
        const user = new User({
            email: 'bhanustark1@gmail.com',
            password: hash,
            name: 'Bhanu Stark'
        });
        await user.save(); // saves to the database
        return new Response("Created!");
    },
    login: async (req: Request) => {

    },
    getUserById: async (req: Request) => {

    }
}
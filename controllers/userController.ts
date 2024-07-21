import { User } from "../models/User";
import type { User as UserType } from "../models/User";

const { ENABLE_REGISTRATION } = Bun.env

export default {
    signup: async ({ jwt, cookie: { auth }, body }: { jwt: any, cookie: any, body: UserType }) => {
        const { email, name, password } = body
        if (!ENABLE_REGISTRATION) return "Not allowed"
        if (!name || !email || !password) throw new Error("Fields email, name, password are required!")
        const hash = await Bun.password.hash(password);
        const user = new User({
            email,
            password: hash,
            name
        });
        await user.save();
        auth.set({
            value: await jwt.sign(user),
            httpOnly: true,
            maxAge: 7 * 86400,
            path: '/'
        })
        return `Signed in as ${user?.name}`
    },
    login: async ({ jwt, cookie: { auth }, body }: { jwt: any, cookie: any, body: { email: string; password: string; } }) => {
        const { email, password } = body;
        const user = await User.findOne({ email })
        if (user) {
            const verifiedPassword = await Bun.password.verify(password, user.password)
            if (verifiedPassword) {
                auth.set({
                    value: await jwt.sign({
                        _id: user._id.toString(),
                        email: user.email,
                        role: user.role
                    }),
                    httpOnly: true,
                    maxAge: 7 * 86400,
                    path: '/'
                })
                return `Signed in as ${user?.name}`
            } else {
                throw new Error("Wrong credential")
            }
        } else {
            throw new Error("Wrong credential")
        }
    },
    updateUserById: async ({ body, params: { userId } }: { body: any, params: { userId: string } }) => {
        const user = await User.findByIdAndUpdate(userId, body)
        return user
    },
    getUserById: async ({ params: { userId } }: { params: { userId: string } }) => {

    }
}
import { User } from "../models/User";
import type { User as UserType } from "../models/User";

export default {
    signup: async ({ jwt, cookie: { auth }, body }: { jwt: any, cookie: any, body: UserType }) => {
        const { email, name, password } = body
        if (name && email && password) {
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
        } else {
            throw new Error("Fields email, name, password are required!")
        }
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
    getUserById: async ({ params: { userId } }: { params: { userId: string } }) => {

    }
}
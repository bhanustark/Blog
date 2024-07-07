import { UserRole } from "../models/User";

export const authRequired = async ({ jwt, set, cookie: { auth } }: any) => {
    const user = await jwt.verify(auth.value)
    jwt.user = user;
    if (!user) {
        set.status = 401
        return 'Unauthorized'
    }
}

export const adminAuthRequired = async ({ jwt, set, cookie: { auth } }: any) => {
    const user = await jwt.verify(auth.value)
    jwt.user = user;
    if (!user || user.role !== UserRole.Admin) {
        set.status = 401
        return 'Unauthorized'
    }
}

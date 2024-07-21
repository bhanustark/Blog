import { authRequired } from "../middlewares/auth"

const getAllPostsRouteSchema = {
    beforeHandle: async (args: any) => {
        await authRequired(args)
    }
}

export default { getAllPostsRouteSchema }
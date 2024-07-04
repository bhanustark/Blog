import userController from "../controllers/userController"


export default {
    signup: userController.signup,
    login: userController.login,
    getUserById: userController.getUserById
}
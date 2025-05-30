import { Router } from "express";
import { userLogin, userSignup } from "../controllers/user.controller";

export const userRouter = Router()

userRouter.route("/signup").post(userSignup)
userRouter.route("/login").post(userLogin)

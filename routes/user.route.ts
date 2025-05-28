import { Router } from "express";
import { userLogin } from "../controllers/user.controller";

export const userRouter = Router()

userRouter.route("/login").post(userLogin)

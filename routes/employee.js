import express from "express";
import { loginEmployee, saveUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",saveUser)
userRouter.post("/login",loginUser) //securiti   chek krannath post thama use kranne 

export default userRouter;//serviceRouter new
import { Router } from "express";
import { signup, signin } from "../controllers/auth.js";
import { validateSignup, validateSignin } from "../middlewares/auth.js";

const authRouter = Router();
authRouter.post("/signup", validateSignup, signup);
authRouter.post("/signin", validateSignin, signin);

export default authRouter;

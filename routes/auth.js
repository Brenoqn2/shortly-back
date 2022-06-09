import { Router } from "express";
import { signup } from "../controllers/auth.js";
import { validateSignup } from "../middlewares/auth.js";

const authRouter = Router();
authRouter.post("/signup", validateSignup, signup);

export default authRouter;

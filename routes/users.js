import { Router } from "express";
import { getUser } from "../controllers/users.js";
import { validateToken } from "../middlewares/auth.js";
import { validateUser, validateTokenWithId } from "../middlewares/users.js";

const usersRouter = Router();
usersRouter.get(
  "/users/:id",
  validateUser,
  validateToken,
  validateTokenWithId,
  getUser
);

export default usersRouter;

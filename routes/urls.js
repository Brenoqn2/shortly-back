import { Router } from "express";
import { shortenUrl } from "../controllers/urls.js";
import { validateUrl } from "../middlewares/urls.js";
import { validateToken } from "../middlewares/auth.js";

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", validateToken, validateUrl, shortenUrl);

export default urlsRouter;

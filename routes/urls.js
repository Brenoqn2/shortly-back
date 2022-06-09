import { Router } from "express";
import { shortenUrl, getUrlById } from "../controllers/urls.js";
import { validateUrl, validateUrlId } from "../middlewares/urls.js";
import { validateToken } from "../middlewares/auth.js";

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", validateToken, validateUrl, shortenUrl);
urlsRouter.get("/urls/:id", validateUrlId, getUrlById);

export default urlsRouter;

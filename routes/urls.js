import { Router } from "express";
import {
  shortenUrl,
  getUrlById,
  openUrl,
  deleteUrl,
} from "../controllers/urls.js";
import {
  validateUrl,
  validateUrlId,
  validateShortUrl,
  validateTokenWithId,
} from "../middlewares/urls.js";
import { validateToken } from "../middlewares/auth.js";

const urlsRouter = Router();
urlsRouter.post("/urls/shorten", validateToken, validateUrl, shortenUrl);
urlsRouter.get("/urls/:id", validateUrlId, getUrlById);
urlsRouter.get("/urls/open/:shortUrl", validateShortUrl, openUrl);
urlsRouter.delete(
  "/urls/:id",
  validateToken,
  validateUrlId,
  validateTokenWithId,
  deleteUrl
);

export default urlsRouter;

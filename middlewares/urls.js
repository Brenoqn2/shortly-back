import validateSchema from "../schemas/validateSchema.js";
import { urlSchema } from "../schemas/urls.js";
import db from "../database.js";

export async function validateUrl(req, res, next) {
  const validation = validateSchema(req.body, urlSchema);
  if (validation !== true) {
    return res.status(422).send("Invalid URL");
  }

  next();
}

export async function validateUrlId(req, res, next) {
  const { id } = req.params;
  const url = await db.query(
    `
        SELECT id
        FROM links 
        WHERE id = $1
    `,
    [id]
  );
  if (url.rows.length === 0) {
    return res.sendStatus(404);
  }

  next();
}

export async function validateShortUrl(req, res, next) {
  const { shortUrl } = req.params;
  const url = await db.query(
    `
        SELECT "shortenedLink"
        FROM links
        WHERE "shortenedLink" = $1
    `,
    [shortUrl]
  );
  if (url.rows.length === 0) {
    return res.sendStatus(404);
  }

  next();
}

export async function validateTokenWithId(req, res, next) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const validation = await db.query(
    `
        SELECT "shortenedLink"
        FROM links
        WHERE id = $1 AND "userId" = (SELECT "userId" FROM sessions WHERE token = $2)
    `,
    [id, token]
  );
  if (validation.rows.length === 0) {
    return res.sendStatus(401);
  }
  next();
}

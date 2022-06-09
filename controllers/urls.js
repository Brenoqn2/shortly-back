import db from "../database.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { url } = req.body;
  const shortUrl = nanoid(8);
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    await db.query(
      `
        INSERT INTO links ("originalLink", "shortenedLink", "userId")
        VALUES ($1, $2, (SELECT "userId" FROM sessions WHERE token = $3))
        `,
      [url, shortUrl, token]
    );
    res.status(201).send({ shortUrl: shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

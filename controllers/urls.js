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

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const url = await db.query(
      `
        SELECT id, "originalLink", "shortenedLink"
        FROM links
        WHERE id = $1
        `,
      [id]
    );
    res.status(200).send(url.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function openUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const url = await db.query(
      `
        SELECT "originalLink"
        FROM links
        WHERE "shortenedLink" = $1
    `,
      [shortUrl]
    );
    res.status(200).redirect(url.rows[0].originalLink);
    db.query(
      `
        UPDATE links
        SET "views" = "views" + 1
        WHERE "shortenedLink" = $1
    `,
      [shortUrl]
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

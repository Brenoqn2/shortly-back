import db from "../database.js";

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await db.query(
      `
        SELECT name, SUM(links.views) as "visitCount"
        FROM users
        JOIN links ON users.id = "userId"
        WHERE users.id = $1
        GROUP BY users.id
        `,
      [id]
    );
    if (user.rows[0].length === 0) res.status(404).send("User has no links");
    const { name, visitCount } = user.rows[0];
    const urls = await db.query(
      `
        SELECT id, "shortenedLink" as "shortUrl", "originalLink" as url, views as "visitCount"
        FROM links
        WHERE "userId" = $1
    `,
      [id]
    );
    res.status(200).send({
      id: id,
      name: name,
      visitCount: visitCount,
      shortenedUrls: urls.rows,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

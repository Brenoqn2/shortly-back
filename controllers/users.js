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

export async function getRanking(req, res) {
  try {
    const ranking = await db.query(
      `
      SELECT "userId" as id, name, COUNT(links) as "linksCount", SUM(links.views) as "visitCount"
      FROM users
      JOIN links ON users.id = "userId"
      GROUP BY links."userId",name
      ORDER BY SUM(links.views) DESC
      LIMIT 10
    `
    );
    res.status(200).send(ranking.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

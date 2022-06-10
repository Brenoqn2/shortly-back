import db from "../database.js";

export async function validateUser(req, res, next) {
  const { id } = req.params;
  const user = await db.query(
    `
        SELECT id
        FROM users
        WHERE id = $1
    `,
    [id]
  );
  if (user.rows.length === 0) {
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
        SELECT "userId"
        FROM sessions
        WHERE token = $1
    `,
    [token]
  );
  if (validation.rows[0].userId !== Number(id)) {
    return res.sendStatus(401);
  }
  next();
}

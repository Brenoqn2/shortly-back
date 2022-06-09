import db from "../database.js";
import bcrypt from "bcrypt";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.query(
      `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
    `,
      [name, email, hashedPassword]
    );
    res.send(201);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.detail);
  }
}

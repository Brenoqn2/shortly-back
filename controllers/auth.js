import db from "../database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(422).send(err.detail);
  }
}

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const storedPassword = await db.query(
      `
        SELECT password
        FROM users
        WHERE email = $1
    `,
      [email]
    );
    const isValid = bcrypt.compareSync(
      password,
      storedPassword.rows[0].password
    );
    if (!isValid) {
      return res.status(401).send("Invalid credentials");
    }
    const token = uuid();
    await db.query(
      `
        INSERT INTO sessions (token, "userId")
        VALUES ($1, (SELECT id FROM users WHERE email = $2))
    `,
      [token, email]
    );
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid credentials");
  }
}

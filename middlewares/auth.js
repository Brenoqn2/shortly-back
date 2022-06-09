import validateSchema from "../schemas/validateSchema.js";
import db from "../database.js";
import { signupSchema, siginSchema, tokenSchema } from "../schemas/auth.js";

export async function validateSignup(req, res, next) {
  const validation = validateSchema(req.body, signupSchema);
  if (validation !== true) {
    return res.status(422).send(validation);
  }

  next();
}

export async function validateSignin(req, res, next) {
  const validation = validateSchema(req.body, siginSchema);
  if (validation !== true) {
    return res.status(422).send(validation);
  }

  next();
}

export async function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const validation = validateSchema(authorization, tokenSchema);
    if (validation !== true) {
      return res.status(401).send("Invalid token");
    }
    const token = authorization.split(" ")[1];
    const storedToken = await db.query(
      `
              SELECT token
              FROM sessions
              WHERE token = $1
          `,
      [token]
    );
    if (storedToken.rows.length === 0) {
      return res.status(401).send("Invalid token");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid token");
  }
  next();
}

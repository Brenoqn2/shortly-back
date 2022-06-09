import validateSchema from "../schemas/validateSchema.js";
import { signupSchema, siginSchema } from "../schemas/auth.js";

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

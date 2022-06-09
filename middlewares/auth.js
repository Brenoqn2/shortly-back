import validateSchema from "../schemas/validateSchema.js";
import { signupSchema } from "../schemas/auth.js";

export async function validateSignup(req, res, next) {
  const validation = validateSchema(req.body, signupSchema);
  if (validation !== true) {
    return res.status(422).send(validation);
  }

  next();
}

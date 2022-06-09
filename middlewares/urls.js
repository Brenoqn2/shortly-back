import validateSchema from "../schemas/validateSchema.js";
import { urlSchema } from "../schemas/urls.js";

export async function validateUrl(req, res, next) {
  const validation = validateSchema(req.body, urlSchema);
  if (validation !== true) {
    return res.status(422).send("Invalid URL");
  }

  next();
}

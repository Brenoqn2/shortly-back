import joi from "joi";

export const signupSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
});

export const siginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const tokenSchema = joi.string().required();

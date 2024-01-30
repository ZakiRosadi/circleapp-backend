import * as joi from "joi";

export const AuthUtilsRegister = joi.object({
  username: joi.string().min(4).required(),
  fullname: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  // profile_picture: joi.string().required(),
  // profile_description: joi.string().max(100).required(),
});

export const AuthUtilsLogin = joi.object({
  email: joi.string().email().min(4).required(),
  password: joi.string().required(),
});

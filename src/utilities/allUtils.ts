import * as joi from "joi";

export const ThreadUtil = joi.object({
  // image: joi.string().required(),
  content: joi.string().max(100).required(),
  // user: joi.number().required(),
});

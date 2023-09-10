import Joi from "joi";

export const registerUserValidation = Joi.object({
  username: Joi.string().required().min(6).label("Username").messages({
    "string.empty": '"Username" cannot be empty',
    "string.min": '"Username" should have a minimum length of 6',
    "any.required": '"Username" is required',
  }),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .label("Email")
    .max(255)
    .messages({
      "string.email": '"Email" must be a valid email',
      "string.empty": '"Email" cannot be empty',
      "any.required": '"Email" is required',
      "string.max": '"Email" must have a maximum length of 255',
    }),
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\[\]{}()_\-.]{8,}$/
    )
    .min(8)
    .max(128)
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase, lowercase, number, and special character",
      "string.min": '"Password" should have a minimum length of 8',
      "string.max": '"Password" should have a maximum length of 128',
      "string.empty": '"Password" cannot be empty',
      "any.required": '"Password" is required',
    }),
});

import Joi from "joi";

export const createApartmentValidation = Joi.object({
  title: Joi.string().required().label("Title").messages({
    "string.empty": '"Title" cannot be empty',
    "any.required": '"Title" is required',
  }),
  address: Joi.string().required().label("Address").messages({
    "string.empty": '"Address" cannot be empty',
    "any.required": '"Address" is required',
  }),
  description: Joi.string().required().label("Description").messages({
    "string.empty": '"Description" cannot be empty',
    "any.required": '"Description" is required',
  }),
  photos: Joi.array()
    .items(
      Joi.string().uri().label("Photo URL").messages({
        "string.uri": '"Photo URL" must be a valid URL',
        "string.empty": '"Photo URL" cannot be empty',
      })
    )
    .required()
    .label("Photos")
    .messages({
      "array.base": '"Photos" must be an array of valid URLs',
      "array.min": '"Photos" should have at least one photo',
      "any.required": '"Photos" is required',
    }),
  perks: Joi.array()
    .items(
      Joi.string().label("Perk").messages({
        "string.empty": '"Perk" cannot be empty',
      })
    )
    .required()
    .label("Perks")
    .messages({
      "array.base": '"Perks" must be an array',
      "any.required": '"Perks" is required',
    }),
  extraInfo: Joi.string().required().label("Extra Info").messages({
    "string.empty": '"Extra Info" cannot be empty',
    "any.required": '"Extra Info" is required',
  }),
  checkIn: Joi.date().iso().required().label("Check In").messages({
    "date.base": '"Check In" must be a valid date in ISO format',
    "any.required": '"Check In" is required',
  }),
  checkOut: Joi.date().iso().required().label("Check Out").messages({
    "date.base": '"Check Out" must be a valid date in ISO format',
    "any.required": '"Check Out" is required',
  }),
  maxGuests: Joi.number()
    .integer()
    .min(1)
    .required()
    .label("Max Guests")
    .messages({
      "number.base": '"Max Guests" must be a number',
      "number.integer": '"Max Guests" must be an integer',
      "number.min": '"Max Guests" must be at least 1',
      "any.required": '"Max Guests" is required',
    }),
});

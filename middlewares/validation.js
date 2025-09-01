const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom Joi extension for URL validation using validator
const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error("string.uri");
  }
  return value;
};

//Clothing Item Creation
const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      })
      .required(),
    imageUrl: Joi.string()
      .custom(urlValidator)
      .messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      })
      .required(),
  }),
});

//User Creation
const validateUserCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string()
      .custom(urlValidator)
      .messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      })
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

//User Login
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

//ID Validation (for params like /users/:id or /items/:id)
const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserCreation,
  validateUserLogin,
  validateId,
};

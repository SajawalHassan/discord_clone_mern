const joi = require("joi");

module.exports.userRegistrationValidation = (data) => {
  const schema = joi.object({
    username: joi.string().required().min(3).max(255),
    email: joi.string().required().min(6).max(255).email(),
    password: joi.string().required().min(8),
  });

  // Validating data
  return schema.validate(data);
};

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

module.exports.serverCreateValidation = (data) => {
  const schema = joi.object({
    banner: joi.string().allow(""),
    image: joi.string().allow(""),
    title: joi.string().required().min(3).max(255),
    description: joi.string().required().min(15).max(1000),
  });

  return schema.validate(data);
};

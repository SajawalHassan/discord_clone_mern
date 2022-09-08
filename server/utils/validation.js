const joi = require("@hapi/joi");

module.exports.userRegistrationValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).max(255).required(),
    email: joi.string().min(3).max(255).email().required(),
    password: joi.string().min(8).required(),
  });

  return schema.validate(data);
};

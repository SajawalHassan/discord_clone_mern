const joi = require("@hapi/joi");

module.exports.userRegistrationValidation = (data) => {
  const currentYear = new Date().getFullYear();
  const schema = joi.object({
    username: joi.string().min(3).max(255).required(),
    email: joi.string().min(3).max(255).email().required(),
    password: joi.string().min(8).required(),
    profilePic: joi.string().allow(""),
    month: joi.string().required(),
    day: joi.number().min(1).max(31).required(),
    year: joi
      .number()
      .min(currentYear - 200)
      .max(currentYear)
      .required(),
  });

  return schema.validate(data);
};

module.exports.serverCreationRegistration = (data) => {
  const schema = joi.object({
    title: joi.string().min(3).max(255).required(),
    banner: joi.string().allow(""),
    icon: joi.string().allow(""),
    description: joi.string().required().min(15).max(1000),
  });

  return schema.validate(data);
};

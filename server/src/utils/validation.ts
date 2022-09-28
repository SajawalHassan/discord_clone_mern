import joi from "joi";

const currentYear = new Date().getFullYear();

export const userRegisterValidation = (data: object) => {
  const schema = joi.object({
    username: joi.string().required().min(3).max(255),
    email: joi.string().required().min(3).max(255).email(),
    password: joi.string().required().min(8).max(1024),
    month: joi.string().required(),
    day: joi.number().required().min(1).max(31),
    year: joi
      .number()
      .required()
      .min(currentYear - 200)
      .max(currentYear),
  });

  return schema.validate(data);
};

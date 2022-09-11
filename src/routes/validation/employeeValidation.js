const Joi = require('@hapi/joi');

const employeeDataValidation = Joi.object({
  firstName: Joi.string().alphanum().min(6).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone:Joi.string().required(),
  gender: Joi.string().required(),

});
 

module.exports = {
  employeeDataValidation
}
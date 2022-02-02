const Joi = require("Joi");
module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};

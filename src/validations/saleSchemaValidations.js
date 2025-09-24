const Joi = require('joi');

const saleSchemaJoi = Joi.object({
    totalInitiated: Joi.number().integer().required(),
    totalCapturedCount: Joi.number().integer().min(0).default(0),
    totalCapturedAmount: Joi.number().min(0).default(0),
    totalDeliveredCount: Joi.number().integer().min(0).default(0),
    totalDeliveredAmount: Joi.number().min(0).default(0),
    totalRefundCount: Joi.number().min(0).default(0),
    totalRefundAmount: Joi.number().min(0).default(0)
});

const saleDataSchema = Joi.object().pattern(
    Joi.string(),   // key = string (like "qr-ticket")
    saleSchemaJoi   // value = saleSchemaJoi
);

module.exports = saleDataSchema;

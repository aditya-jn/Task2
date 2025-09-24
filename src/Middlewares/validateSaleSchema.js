const saleDataSchema = require('../validations/index')
const validateSaleData = (req, res, next) => {
    const { error } = saleDataSchema.validate(req.body.saleData, { abortEarly: false });
    if (error) {
        return res.status(400).json({ 
            status: "error",
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }
    next();
};

module.exports = {validateSaleData};
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    totalInitiated: Number,
    totalCapturedCount: Number,
    totalCapturedAmount: Number,
    totalDeliveredCount: Number,
    totalDeliveredAmount: Number,
    totalRefundCount: Number,
    totalRefundAmount: Number
}, { _id: false });

const mainSchema = new mongoose.Schema({
    saleData: {
        type: Map,
        of : saleSchema
    }
    
},
{
 timestamps: true,
});

const Sales = mongoose.model('sale', mainSchema);

module.exports = Sales;

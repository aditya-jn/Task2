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
        "qr-ticket": saleSchema,
        "metro-card-recharge": saleSchema,
        "wallet-topup": saleSchema,
        "sv-qr-topup": saleSchema,
        "integrated-last-mile-connectivity": saleSchema,
        "last-mile-connectivity": saleSchema,
        "utility": saleSchema,
        "store-value-qr": saleSchema,
        "locker-console-booking": saleSchema,
        "qr-ticket-airportLine": saleSchema,
        "ecommerce": saleSchema,
        "rrts-tickets": saleSchema
    }
    
},
{
 timestamps: true,
});

const Sales = mongoose.model('sale', mainSchema);

module.exports = Sales;

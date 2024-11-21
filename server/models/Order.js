// server/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    customerPhone: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    total: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);

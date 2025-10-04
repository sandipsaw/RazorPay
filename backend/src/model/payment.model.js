const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
    signature: {
        type: String,
    },
    price: {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        default: 'pending',
        enum:['pending','completed','failed']
    },
}, { timestamps: true });

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
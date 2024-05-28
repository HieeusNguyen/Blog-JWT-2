const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invoice = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        name: String,
        items: [
            {
                productId: { type: mongoose.Types.ObjectId, ref: 'Bike', required: true },
                name: String,
                price: Number,
                quantity: { type: Number, required: true },
            }
        ],
        totalAmount: { type: Number, required: true },
        address: String,
        email: String,
        phone: String,
        status: { type: String, enum: ['Pending', 'Completed', "Failed"], default: 'Pending' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Invoice', Invoice);

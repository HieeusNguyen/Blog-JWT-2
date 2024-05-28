const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                productId: { type: mongoose.Types.ObjectId, ref: 'Bike', required: true },
                name: String,
                price: Number,
                image: String,
                quantity: { type: Number, required: true },
            }
        ],
        totalAmount: { type: Number, required: true },
        status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Invoice', invoiceSchema);

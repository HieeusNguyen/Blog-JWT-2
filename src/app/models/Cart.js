const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Cart = new Schema(
    {
        userId:{type: mongoose.Types.ObjectId},
        productId: {type: mongoose.Types.ObjectId},
        name: String,
        price: Number,
        image: String,
        quantity: {type: Number},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);

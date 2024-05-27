const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Cart = new Schema(
    {
        userId:{type: Schema.Types.ObjectId, ref:'User'},
        name: {type: String},
        image: {type: String},
        price: {type: Number},
        quantity: {type: Number},
        Info: {type: String}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);

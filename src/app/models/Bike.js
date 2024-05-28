const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const bikeSchema = new Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        price: { type: Number, require: true },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: "name"},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);

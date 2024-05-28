const { decode } = require("jsonwebtoken");
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const { mongooseToObject, mutipleMongooseToObject } = require("../../util/mongoose");
const Bike = require("../models/Bike");
const { convertToObjectId } = require("../../util/objectId");
class CartController {
    // GET /me/stored/courses
    async addToCart(req, res, next) {
        const { productId, quantity } = req.body;
        const userId = decode(req.cookies.jwt).id;
       const dataBike = await Bike.findOne({_id:new mongoose.Types.ObjectId(productId)})
        const formData = {
            productId: new mongoose.Types.ObjectId(productId),
            image: dataBike?.image,
            name: dataBike?.name,
            price: dataBike?.price,
            quantity: Number(quantity),
            userId: new mongoose.Types.ObjectId(userId),
        };
        const data = await Cart.findOne({ userId, productId });
        if (data == null) {
            console.log(123);
            const cart = new Cart(formData);
            cart.save()
                .then((data) => res.json(data))
                .catch(next);
        } else {
            console.log(456);
            const cart = await Cart.findOneAndUpdate(
                { userId, productId },
                { $set: { quantity: data.quantity + Number(quantity) } },
                { new: true }
            );
            res.json(cart);
        }
    }

    getCart(req, res, next){
        const userId = decode(req.cookies.jwt).id;
        Cart.find({userId})
        .then((data) => {
            console.log(data)
            res.render("cart/show", {data: mutipleMongooseToObject(data)})
        })
    }

    getCheckOut(req,res,next){
        const userId = decode(req.cookies.jwt).id;
        Cart.find({userId})
        .then((data) => {
            console.log(data)
            res.render("cart/checkout", {data: mutipleMongooseToObject(data)})
        })
    }

    removeProductFromCart(req,res,next){
        const {id} = req.params
        Cart.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)})
        .then(() => {
            res.redirect("/cart/order")
        })
        .catch(next)
    }

}

module.exports = new CartController();

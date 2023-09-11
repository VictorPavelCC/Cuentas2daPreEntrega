const mongoose = require("mongoose");

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    products: [{}],
});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = { cartModel };
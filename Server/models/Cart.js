const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema({
 productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
 email: { type: String, required: true }, // ใช้ email จาก Firebase
 quantity: { type: Number, required: true },
 name: { type: String, required: true },
 price: { type: Number, required: true },
 image: { type: String, required: true },
}, { timestamps: true });

const CartModel = model("Cart", CartSchema);
module.exports = CartModel;

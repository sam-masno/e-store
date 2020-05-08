const mongoose = require("mongoose");
const User = require('./user');
// const { Object, CartItem } = require('../models/order');
const Product = require('./product');
const {Schema} = mongoose;
const { ObjectId } = mongoose.Schema;
 
const CartItemSchema = new Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);
 
const CartItem = mongoose.model("CartItem", CartItemSchema);
 
const OrderSchema = new Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "user" }
  },
  { timestamps: true }
);

OrderSchema.pre('save', function (next) {

  this.products.forEach(async item => {
    const product = await Product.findById(item.product);
    product.sold += item.count;
    product.quantity -= item.count;
    await product.save();
  })
  
  next();

})
 
const Order = mongoose.model("Order", OrderSchema);
 
module.exports = { Order, CartItem };
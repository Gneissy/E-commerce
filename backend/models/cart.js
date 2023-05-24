const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  products: [
    {
      productId: String,
      quantity: { type: Number, default: 1 }
    }
  ],
},
  // This is creating/updating the date by using a mongoose func, instead Date.now()
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);


module.exports = Cart;

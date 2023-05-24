const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: String,
      quantity: { type: Number, default: 1 }
    }
  ],
  amount: { type: Number, required: true },
  // I'll get all info about address, as an object
  address: { type: Object, required: true },
  status: { type: String, default: "Awaiting your requests" }
},
  // This is creating/updating the date by using a mongoose func, instead Date.now()
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);


module.exports = Order;

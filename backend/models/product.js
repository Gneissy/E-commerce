const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  categories: { type: Array, required: true },
  size: String,
  color: String,
  price: { type: Number, required: true },
  inStock: {type: Boolean, default: true },
},
  // This is creating/updating the date by using a mongoose func, instead Date.now()
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);


module.exports = Product;

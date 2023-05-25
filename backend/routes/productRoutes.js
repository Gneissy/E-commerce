const express = require('express');
const router = express.Router();

// Bringing in Models
const Product = require("../models/product");

// Bringing in Middlewares
const { verifyToken, verifyBothTokenAndAuthorization, verifyTokenAndCheckAdmin } = require("../middlewares/verifyToken");


// Get All Products // Everyone can see all products // Works
router.get("/", async function(req, res){
  const queryCategory = req.query.category;
  try{
    let products;
    if(queryCategory){
      products = await Product.find({
        categories: {
          $in: [queryCategory]
        }
      });
    }
    else{
      products = await Product.find({});
    }
    res.status(200).json(products);
  }
  catch(err){
    res.status(500).json(err);
  }

});


// Get One Product // Everyone can see a product // Works
router.get("/:id", async function(req, res){
  try{
    const productId = req.params.id;
    const product = await Product.findById( productId );
    res.status(200).json(product);
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


// Create New Product // Only admin can create new products // Works
// TODO There should be verifyTokenAndCheckAdmin middleware
router.post("/", verifyTokenAndCheckAdmin, async function(req, res){
  try{
    const newProduct = new Product( req.body ) ;
    console.log(newProduct);

    await newProduct.save();
    res.status(201).json(newProduct);
  }
  catch(err){
    res.json({msg: err});
  }
});


// Updating a product // Only admin can update a product // Works
router.patch("/:id", verifyTokenAndCheckAdmin, async function(req, res){
  try{
    const productId = req.params.id;
    const productUpdated = await Product.findByIdAndUpdate( productId, {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(productUpdated);
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


// Delete a product // Only admin can delete a product // Works
router.delete("/:id", verifyTokenAndCheckAdmin, async function(req, res){
  try{
    const productId = req.params.id;
    const productDeleted = await Product.findByIdAndDelete( productId );
    res.status(200).json({msg: "Successfully deleted product: " + productDeleted.title });
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


module.exports = router;

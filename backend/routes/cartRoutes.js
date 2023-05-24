const express = require('express');
const router = express.Router();

// Bringing in Models
const Cart = require("../models/cart");

// Bringing in Middlewares
const { verifyToken, verifyBothTokenAndAuthorization, verifyTokenAndCheckAdmin } = require("../middlewares/verifyToken");

// Get All Carts
// Only admin can see all carts
// Works
router.get("/", verifyTokenAndCheckAdmin, async function(req, res){
  try{
    let carts = await Cart.find({});
    res.status(200).json(carts);
  }
  catch(err){
    res.status(500).json(err);
  }
});


// Get One User's Cart
// User and admin can see user's cart.
// Works
router.get("/:id", verifyBothTokenAndAuthorization, async function(req, res){
  try{
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


// Create New Cart
// Everyone can have a Cart. To give an order, need Authorization.
// Works
router.post("/", verifyToken, async function(req, res){
  try{
    const newCart = new Cart( req.body ) ;
    console.log(newCart);

    await newCart.save();
    res.status(201).json(newCart);
  }
  catch(err){
    res.json({msg: err});
  }
});


// Updating a cart
// User and admin can change user's cart
// Not working yet @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
router.patch("/:id", verifyBothTokenAndAuthorization, async function(req, res){
  try{
    const cartUpdated = await Cart.findByIdAndUpdate( req.params.id, {
        $set: req.body
      },
      { new: true }
    );
    console.log(cartUpdated);
    res.status(200).json(cartUpdated);
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


// Delete a cart
// User and admin can delete this cart.
// Works
router.delete("/:id", verifyBothTokenAndAuthorization, async function(req, res){
  try{
    const cartDeleted = await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(200).json({msg: "Successfully deleted the cart. Cart had belonged to this user: " + cartDeleted.userId });
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


module.exports = router;

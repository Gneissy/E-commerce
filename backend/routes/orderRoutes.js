const express = require('express');
const router = express.Router();

// Bringing in Models
const Order = require("../models/order");

// Bringing in Middlewares
const { verifyToken, verifyBothTokenAndAuthorization, verifyTokenAndCheckAdmin } = require("../middlewares/verifyToken");


// Get All Orders
// Only admin can see all orders
// Works
router.get("/", verifyTokenAndCheckAdmin, async function(req, res){
  try{
    let orders = await Order.find({});
    res.status(200).json(orders);
  }
  catch(err){
    res.status(500).json(err);
  }
});


// Get One User's Orders
// User and admin can see user's order.
// Works
router.get("/:id", verifyBothTokenAndAuthorization, async function(req, res){
  try{
    // Users can have more than one orders
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


// Create New Order
// To give an order, need Authorization. (This may be verifyToken if i want)
// Works
router.post("/", verifyBothTokenAndAuthorization, async function(req, res){
  try{
    const newOrder = new Order( req.body ) ;
    console.log(newOrder);

    await newOrder.save();
    res.status(201).json(newOrder);
  }
  catch(err){
    res.json({msg: err});
  }
});


// Updating an order
// Only admin can change user's order
// Works, but for the last created order.
// The reason is "findOne" works for the first found element.
// Need more specification for updating here...
router.patch("/:id", verifyTokenAndCheckAdmin, async function(req, res){
  try{
    const orderUpdated = await Order.findOneAndUpdate({ userId: req.params.id }, {
        $set: req.body
      },
      { new: true }
    );
    console.log(orderUpdated);
    res.status(200).json(orderUpdated);
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


// Delete an order
// Only admin can delete an order
// Works
router.delete("/:id", verifyTokenAndCheckAdmin, async function(req, res){
  try{
    const orderDeleted = await Order.findOneAndDelete({ userId: req.params.id });
    res.status(200).json({msg: "Successfully deleted the order. Order had belonged to this user: " + orderDeleted.userId });
  }
  catch(err){
    res.status(500).json({msg: err});
  }
});


module.exports = router;

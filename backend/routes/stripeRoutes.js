
// Bringing in Express
const express = require('express');
const router = express.Router();

// Bringing in Stripe
const stripe = require("stripe")(process.env.STRIPE_BACKEND_KEY);


// @@@@@@@@ Not over yet, there should be implemention with frontend (React). @@@@@@@@@@@@

// Payment route
router.post("/payment", function(req, res){
  // These are from documentation, not sure if correct:
  stripe.charges.create({
      amount: req.body.amount,

      // During payment, stripe is gonna return me a tokenId from frontend, then i'll use it here.
      source: req.body.tokenId, // Token is created by using Stripe Checkout (Frontend)

      currency: "usd"  // TL doesn't work.
    }, function (stripeErr, stripeRes) {
      if(!stripeErr){
        res.status(200).json(stripeRes);
      }
      else{
        res.status(500).json(stripeErr);
      }
    }
  );
});


module.exports = router;

const express = require("express");
const router = express.Router();

// Instead server-side user storing, i'll prefer JWT for storing them in client (browser)
const jwt = require("jsonwebtoken");

// To encrypt passwords, i'll use bCrypt
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALTROUNDS);


// Bringing in Models
const User = require("../models/user");

// Register // Works
router.post("/register", async function(req, res){
  // bCrypt takes the body password and turns into a hash. We record that hash.
  bcrypt.hash(req.body.password, saltRounds, async function(err, hash){
    const freshUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    try{
      await freshUser.save();
      // 201 means successfully added
      res.status(201).json(freshUser);
    } catch(err){
      // Just 500 error code for now, maybe i add others like 400 etc later on.
      res.status(500).json(err);
    }
  });
});



// Login // Works
router.post("/login", async function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  try{
    const user = await User.findOne({ username: username });
    if(user){ // If user exists
      bcrypt.compare(password, user.password, function(err, result){
        if(result === true){ // If all correct

          // Create a json web token
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

          // Destructuring the object bcz i dont want to send password with json object
          const { password, ...others } = user._doc; // MongoDB stores datas in "_doc"

          // Take all others, and add accessToken while sending as json
          res.status(200).json({...others, accessToken});
        }
        else{ // If password is wrong
          res.status(401).json({msg: "Password is wrong."})
        }
      });
    }
    else{ // If user doesn't exist
      res.status(401).json({msg: "User cannot be found."});
    }
  } catch (err){
    res.status(500).json(err);
  }

});




module.exports = router;

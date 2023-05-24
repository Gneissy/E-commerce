const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALTROUNDS);

// Bringing in Models
const User = require("../models/user");

// Bringing in Middlewares
const { verifyToken, verifyBothTokenAndAuthorization, verifyTokenAndCheckAdmin } = require("../middlewares/verifyToken");


// Update
router.put("/:id", verifyBothTokenAndAuthorization, async function(req, res){
  // If s/he is the owner of the account or admin
      if(req.body.password){
        try{
          // Hash the password:
          const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
          req.body.password = hashedPassword;

          const updatedUser = await User.findByIdAndUpdate( req.params.id ,
            {
              $set: req.body
            },
            { new: true }
          );

          // Destructuring the object for splitting password from others, bcz i dont want to send passwrd.
          const { password, ...others } = updatedUser._doc;
          res.status(200).json(others);

        } catch(err){
          // Just 500 error code for now, maybe i add others like 400 etc later on.
          res.status(500).json(err);
        }
      }

});


// Delete
router.delete("/:id", verifyBothTokenAndAuthorization, async function(req, res){

  if(req.verifiedUser.id === req.params.id  ||  req.verifiedUser.isAdmin){
    try{
      const deletedUser = await User.findByIdAndDelete( req.params.id );
      res.status(200).json({msg: "This user is deleted: " + deletedUser.username });
    }
    catch (err){
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json({msg: "You are not allowed to do that."})
  }

});



// Get Users (Only Admin)
router.get("/:id", verifyTokenAndCheckAdmin, async function(req, res){

  if( req.verifiedUser.isAdmin ){
    try{
      const foundUser = await User.findById( req.params.id );
      if(foundUser){
        const { password, ...others } = foundUser._doc;
        res.status(200).json( others );
      } else{
        res.status(404).json({msg: "No user found"});
      }
    }
    catch (err){
      res.status(500).json(err);
    }
  }
  else{
    res.status(403).json({msg: "You are not allowed to do that."})
  }

});



// Get All Users (Only Admin)
router.get("/", verifyTokenAndCheckAdmin, async function(req, res){

  if( req.verifiedUser.isAdmin ){
    try{
      const foundUsers = await User.find({});
      if(foundUsers){
        // Mapping those users bcz i dont want to send hashed passwords at all.
        const allUsers = foundUsers.map(function( eachUser ){
          const { password, ...others } = eachUser._doc;
          return others;
        });
        res.status(200).json( allUsers );
      } else{
        res.status(404).json({msg: "No user found"});
      }
    }
    catch (err){
      res.status(500).json({msg: err});
    }
  }
  else{
    res.status(403).json({msg: "You are not allowed to do that."})
  }

});


module.exports = router;

const jwt = require ("jsonwebtoken");

// This is gonna be a middleware func
// Which verifies JWT Token
const verifyToken = async function(req, res, next){
  // Takes the token from headers
  const authHeader = req.headers.token; // it's for Postman
  if (authHeader){
    const token = authHeader.split(" ")[1]; // To be able to get token from postman
    // Bearer 812412j412ln4asd... Thats the " "
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, function(err, userData){
      if(!err){
        // I made verifiedUser up.
        req.verifiedUser = userData;
        next();
      }
      else{
        res.status(403).json({msg: "Token is not valid. (Wrong token, expired etc.)"});
      }
    });
  }
  else{
    return res.status(401).json({msg: "You are not authenticated."});
  }
}


// This is gonna be a middleware func
// Which verifies both jwt Token and Authorization
const verifyBothTokenAndAuthorization = async function (req, res, next){
  verifyToken(req, res, function(){
    if(req.verifiedUser.id === req.params.id  ||  req.verifiedUser.isAdmin){
      next();
    }
    else{
      res.status(403).json({msg:"You are not allowed to do that."});
    }
  })
}



// This is gonna be a middleware function
// Which verifies if the user is an admin, for activities only allowable for admins.
const verifyTokenAndCheckAdmin = async function(req, res, next){
  verifyToken(req, res, function(){
    if(req.verifiedUser.isAdmin){
      next();
    }
    else{
      res.status(403).json({msg: "You should be an admin to do that."});
    }
  })
}



module.exports =  {
  verifyToken,
  verifyBothTokenAndAuthorization,
  verifyTokenAndCheckAdmin 
};

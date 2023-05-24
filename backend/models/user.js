const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
},
  // This is creating/updating the date by using a mongoose func, instead Date.now()
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);


module.exports = User;

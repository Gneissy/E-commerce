require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Database connection
const connectDB = require("./backend/config/database");


// Bringing in Models


// Bringing in Routes
const userRoutes = require("./backend/routes/userRoutes");
const productRoutes = require("./backend/routes/productRoutes");
const cartRoutes = require("./backend/routes/cartRoutes");
const orderRoutes = require("./backend/routes/orderRoutes");
const authRoutes = require("./backend/routes/authRoutes");
const stripeRoutes = require("./backend/routes/stripeRoutes");


// localhost:3001/api/user/usertest is an example endpoint.
// Prefer "users" instead "user", kinda best practise for apis.
// Use this endpoint for following routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkout", stripeRoutes);


// Running the server with database
connectDB().then(function (){
      app.listen(process.env.PORT || 3001, function() {
            console.log("Server is on and ready to wrack baby");
      });
});

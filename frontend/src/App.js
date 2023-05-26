import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";


import Example from "./components/Example";
import ProductsList from "./components/ProductsList";
import SingleProductShow from "./components/SingleProductShow";
import ProductsShow from "./components/ProductsShow";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import CartProductsList from "./components/CartProductsList";
import SuccessPage from "./pages/Success";
import RegisterSuccessPage from "./pages/RegisterSuccess";
import AddNewProduct from "./components/AddNewProduct";

import HomePage from "./pages/HomePage";
import styled from "styled-components";

// ProductList'i şu an için mainpage olarak kullanıyorum, ileride bir HomePage component üretilebilir.
function App(){

  // const [loggedIn, setLoggedIn ] = useState(false);
  const user = useSelector(function(state){
    return state.user.currentUser; // This is currentUser from redux store
  });

  // Sending the user data into local storage, maybe i use redux-persist later on
  localStorage.setItem('serteserUser', JSON.stringify(user));

  // console.log(user?.isAdmin)

  
  // useEffect(() => {
    // Retrieve the logged in state from localStorage when the component mounts
    // Fetching logged in state from local storage.
    
    // const storedLoggedIn = localStorage.getItem('loggedIn');
    //   if (storedLoggedIn) {
    //     setLoggedIn(JSON.parse(storedLoggedIn));
    //   }
    // }, []);


    // const toggleRoute = () =>{
    //   const toggledLoggedIn = !loggedIn;
    //   setLoggedIn(toggledLoggedIn);
    //   // Save the toggled logged in state in localstorage
    //   localStorage.setItem('loggedIn', JSON.stringify(toggledLoggedIn));
    // }

  //TODO Main page and /product page is identical right now. I should add category links in "/" route.

  return(
    <Router>
      <Navbar />

      { user?.isAdmin && (
        <Link className = "link" to = "/addnewproduct">
          <button> Add new product</button>
        </Link>
        )
      }

      <Link to = "/">
        <button> Main page "/"</button>
      </Link>
      
      <Routes>
        <Route exact path = "/" element = {<ProductsList />} />
        <Route path = "/login" element = { 
            user
          ? <Navigate replace to={"/"} />
          : <Login />} />
        <Route path = "/register" element = { 
            user
          ? <Navigate replace to={"/"} /> 
          : <Register />} />
        <Route path = "/cart" element = {<CartProductsList />} />
        <Route path = "/products" element = {<ProductsList />} />
        <Route path = "/products/:category" element = {<ProductsList />} />
        <Route path = "/product/:id" element = {<SingleProductShow />} />
        <Route path = "/success" element = {<SuccessPage />} />
        <Route path = "/registersuccess" element = {<RegisterSuccessPage />} />
        <Route path = "/addnewproduct" element = {<AddNewProduct />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

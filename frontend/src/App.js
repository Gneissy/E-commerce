import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import ProductsList from "./components/ProductsList";
import SingleProductShow from "./components/SingleProductShow";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import CartProductsList from "./components/CartProductsList";
import SuccessPage from "./pages/Success";
import RegisterSuccessPage from "./pages/RegisterSuccess";
import AddNewProduct from "./components/AddNewProduct";
import Notification from "./components/Notification";
import NotAuthorized from "./pages/NotAuthorized";

import { addNotification } from "./store";

// ProductList'i şu an için mainpage olarak kullanıyorum, ileride bir HomePage component üretilebilir.
function App(){

  // To be able to reach dispatch
  const dispatch = useDispatch();

  // Getting notifications from redux store
  const notifications = useSelector(function(state){
    return state.notification;
  });

  // For initial "welcome" notification
  useEffect(()=> {
    dispatch(addNotification("Hey, welcome!"));
  }, []);


  // const [loggedIn, setLoggedIn ] = useState(false);
  const user = useSelector(function(state){
    return state.user.currentUser; // This is currentUser from redux store
  });

  // Sending the user data into local storage, maybe i use redux-persist later on
  localStorage.setItem('serteserUser', JSON.stringify(user));


  //TODO Main page and /product page is identical right now. I should add category links in "/" route.


//   <div className = "notification-container">
//   <Notification text = "Welcome to my website" />
// </div>
// <div className = "notification-container">
//   {user && <Notification text = {`Welcome ${user.username} 👋`} />}
// </div>



  return(
    <Router>
      <Navbar />
      <div className = "notification-container">
        {notifications.map((notification, index) => (
          <Notification key={index} text={notification} />
        ))}
      </div>

      { user?.isAdmin && (
        <div className = "admin-panel">
          <hr className = "admin-panel-line" />
          <Link className = "link" to="/addnewproduct">
            <button className="admin-panel-button"> Add new product <i class="fa-solid fa-plus"></i></button>
          </Link>
          <Link className = "link" to="/products">
            <button className="admin-panel-button"> See all products </button>
          </Link>
          <hr className = "admin-panel-line" />
        </div>
        )
      }
     
      
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
        <Route path = "/addnewproduct" element = {
            user?.isAdmin
          ? <AddNewProduct />
          : <NotAuthorized />
        } />
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

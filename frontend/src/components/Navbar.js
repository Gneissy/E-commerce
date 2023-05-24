import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { logout } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Navbar(){

  const dispatch = useDispatch();
  const handleLogout = async function(){
      dispatch(logout());
  }
  const cartQuantity = useSelector(function(state){
  // console.log(state.cart); // works well, returns initial state.
  // like { products: [], quantity: 0, totalPrice: 0 }
    return state.cart.quantity;
  });
  const currentUser = useSelector(function (state){
    if (state.user.currentUser !== null){
      return state.user.currentUser;
    }
  });

  console.log(currentUser);

  return(
  <div className="navbar-wrapper">
    <div className = "navbar-container">
      <div className = "navbar-search-container">
        <form className = "navbar-form" >
          <div className = "navbar-form--container">
            <input className = "navbar-input" placeholder="Search" />
            <button type="submit" className="navbar-search__submit-button fa-solid fa-magnifying-glass fa-2x"></button>
          </div>
        </form>
      </div>
      <div className="navbar-icons-container">
          <div className = "navbar-cart-container">
            <Link className = "link" to = "/cart">
              <i className="cart-image fa-solid fa-cart-shopping fa-2x"></i>
            </Link>
            {cartQuantity !== 0 && <div className="navbar-cart-item-quantity">{cartQuantity}</div>}
          </div>
          <div className = "navbar-user-container">
            <i className="fa-regular fa-user fa-2x user-icon"></i>
            { currentUser 
            ? (
            <>
              <p className="currentUser-username">{currentUser.username}</p>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
            ) 
            : (
            <>
              <Link className="link auth-links" to="/login">Login</Link>
              <Link className="link auth-links" to="/register">Register</Link>
            </>
          )
}

           
            
          </div>
      </div>
    </div>
  </div>
  )
}

export default Navbar;

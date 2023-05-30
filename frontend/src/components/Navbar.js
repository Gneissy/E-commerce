import React from "react";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { logout } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateProducts } from "../store/index";
import { publicRequest } from "../reqMethods";

function Navbar(){

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleLogout = async function(){
      dispatch(logout());
      // An automatic "Good bye" notification pops
      // Due to extraReducers
  }

  const handleSearchChange = async function(event){
    setSearchQuery(event.target.value);
    // This should only be responsible for changing state
  }

  // Handles search functionality for each keypress
  useEffect(()=> {
    const fetchSearchedData = async function(){
      try {
        const response = await publicRequest.get(`/products?search=${searchQuery}`);
        // Update the products list with the search results:
        dispatch(updateProducts(response.data));
      } catch (err){
        console.log(err);
      }
    }
    fetchSearchedData();

    //? Included "dispatch" in 2nd argument, which typically changes when the Redux store is updated.
    //? It's a good practise adding "dispatch" into 2nd argument in useEffects.
    //? It helps ensure that the effect is re-run when the dispatch function changes,
    //? and prevents any potential issues related to stale closures or outdated references to the dispatch function.
  }, [searchQuery, dispatch]);

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

  // console.log(currentUser);

  return(
   
  <div className="navbar-wrapper">    
    <div className = "navbar-container">
      <div className = "navbar-icon-container">
        <Link to = "/" className = "link">
          <i class="fa-solid fa-house fa-2x navbar-house-icon"></i>
        </Link>
      </div>
      


      <div className = "navbar-search-container">
        <form className = "navbar-form" >
          <div className = "navbar-form--container">
            <input className = "navbar-input" placeholder="Search" value={searchQuery} onChange = {handleSearchChange} />
            <button type="submit" className="navbar-search__submit-button fa-solid fa-magnifying-glass fa-2x"></button>
          </div>
        </form>
      </div>
      <div className="navbar-icons-container">
          <div className = "navbar-cart-container">
            <Link className = "link" to = "/cart">
              <i className="cart-image fa-solid fa-cart-shopping fa-2x navbar-cart-icon"></i>
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

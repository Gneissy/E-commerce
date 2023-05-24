import React from "react";
import "./CartProductsList.css"
import CartProductsShow from "./CartProductsShow";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";
import { userRequest } from "../reqMethods";
import { useNavigate } from "react-router-dom";

// This is gonna be fetched from database, from user cart products.
// Just for test purposes, hardcoded data is used.
// const productsAddedToCart = [
//   {
//     id:1,
//     title: "T- Shirt",
//     img:"https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
//     price: 20,
//     size: "L",
//     color: "yellow",
//   },
//   {
//     id:2,
//     title: "T- Shirt",
//     img:"https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
//     price: 20,
//     size:"M",
//   },
// ]


function CartProductsList(){

  const [stripeToken, setStripeToken] = useState(null);

  // Stripe public key
  const KEY = process.env.REACT_APP_STRIPE;

  //
  const onToken = function(token){
    setStripeToken(token);
  }
  console.log(stripeToken);

  // To navigate user to either success or failure page after payment
  const navigate = useNavigate();


  const cart = useSelector(function(state){
    return state.cart;
  });
  // console.log(cart);
  // cart here is sth like this:
  // {
  //   products: { 
  //     { _id: 123a1e24, title: "Polo T-shirt", img: "hedehode.png" ... }, 
  //     price: 55,
  //     count: 2, 
  //     size: l, 
  //     color: red ...
  //   } 
  //   totalPrice: 550,
  //   quantity: 2
  // }
  
  const renderedProducts = cart.products.map(function (product){
      return <CartProductsShow product= {product} key= {product.id} />;
  });


  useEffect(function(){
    const makeRequest = async function(){
      try{
        const response = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id, // stripeToken is an object
          amount: (cart.totalPrice - cart.totalPrice * 0.1)*100,
        });

        // Redirect to /success page
        navigate("/success", {
          data : response.data
        });
      } catch(err){
        console.log(err);
      }
    }
    // Only let if stripeToken exists and totalPrice is higher than 1$
    if(stripeToken && cart.totalPrice >= 1){
      makeRequest();
    }
  }, [stripeToken, cart.totalPrice, navigate]);

  return (
<div className = "cart-products-page-wrapper">
<div className = "cart-products-page-container">

  <div className = "cart-products-summary-container">
    <div className = "cart-products-summary-title-container">
      <p className = "cart-products-summary-title"> Order Summary</p>
    </div>
    <div className = "cart-products-summary-subtotal-container">
      <p>Subtotal: </p>
      <p>{ cart.totalPrice } $</p>
    </div>
    <div className = "cart-products-summary-discount-container">
      <p>Discount (10%): </p>
      <p>-{ cart.totalPrice * 0.1 } $</p>
    </div>
    <div className = "cart-products-summary-total-container">
      <p><strong>You will pay: </strong></p>
      <p><strong>{ cart.totalPrice - cart.totalPrice * 0.1 } $</strong></p>
    </div>

    <StripeCheckout
      name="Ahmet Serteser" 
      image= "https://ahmetserteser.dev/images/image-myself-cropped.png"
      billingAddress
      shippingAddress
      description={`Total: ${cart.totalPrice - cart.totalPrice * 0.1}$`}
      amount={(cart.totalPrice - cart.totalPrice * 0.1)*100}
      token= {onToken}
      stripeKey={KEY}
    >
      <div className = "cart-products-addtocart-container" >
        <button 
          className="cart-products-addtocart-button"
          type = "submit" 
          disabled={
            cart.totalPrice === 0 
            ? true 
            : false
          }
        > 
          Checkout Now  
        </button>
        
      </div>
    </StripeCheckout>
    


  </div>

  <div className = "cart-products-list"> {renderedProducts} </div>
</div>
</div>

  );
}

export default CartProductsList;

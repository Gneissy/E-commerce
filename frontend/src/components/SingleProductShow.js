import React from "react";
import "./SingleProductShow.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../reqMethods";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../store/index";
import { addNotification } from "../store/index";

function SingleProductShow(){

  // Declaring dispatch
  const dispatch = useDispatch();

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // console.log(id); // Example output: 6443f1cb5620b0a12f62de72

  const [ product, setProduct ] = useState({});
  const [ color, setColor ] = useState("");
  const [ size, setSize ] = useState("");

  const handleColorChange = function(event){
    setColor(event.target.value);
  }
  const handleSizeChange = function(event){
    setSize(event.target.value);
  }

  useEffect(function(){
    const getProduct = async function(){
      try{
        //! Careful that api call is "/products", but single page is "/product/id". changable in App.js
        // Following publicRequest is essentially an axios request for public.
        const res = await publicRequest.get(`/products/${id}`);
        // console.log(res.data); // expected output: a product object.
        setProduct(res.data);
      } catch(err){
        // handle err
      }
    }
    getProduct();
  }, [id]);

  // console.log(size, color);

  const [count, setCount] = useState(1);
  const handlePlusClick = function(){
    setCount(count+1);
  }
  const handleMinusClick = function(){
    if(count!==1){
      setCount(count-1);
    }
  }

  const handleAddCartClick = function(){
    //* Redux related code here
    dispatch(addProductToCart(
      // payload is here 
      // sending our local states to redux store
      {
        ...product, // whole product object
        count: count, // as extra, quantity of items,
        color: color, // selected color property
        size: size // and selected size property 
      }
    ));

    // For notifications
    // It could be handled by extraReducers, i'll check that later on
    const newNotification = `${count}x ${product.title} added to the cart.`;
    dispatch(addNotification(newNotification));
  }

  //** Temp */
  const colors = ["red", "blue", "lightblue"];
  const sizes = ["s","m","l","xl"];
  
  return(


    <div className= "sp-container">
    <div className = "sp-wrapper">

      <div className = "sp-image-wrapper">
        <img className = "sp-img" src = {product.img} />
      </div>

      <div className = "sp-details-wrapper">
      <p className = "sp-title"> { product.title } </p>
      <p className = "sp-description"> { product.description } </p>


      <div className = "sp-price-container">
        <p className = "sp-price"> { product.price * count } ₺ </p>
        <div className = "sp-quantity-container">
          <i className = "sp-quantity-change fa-solid fa-minus" onClick = {handleMinusClick} ></i>
          <p className = "sp-quantity"> { count } </p>
          <i className = "sp-quantity-change fa-solid fa-plus" onClick = {handlePlusClick}></i>
        </div>

      </div>


      <div className = "sp-options">
        {product.color && 
          <select onChange = { handleColorChange }>
            <option disabled selected>Colors</option>
            <option > {product.color} </option>
          </select>
        }
        {product.size && 
          <select onChange = { handleSizeChange }>
            <option disabled selected>Size</option>
            <option  >{product.size}</option>
          </select>
        }
    </div>

    <div className = "sp-addtocart-container" >
      <button className = "sp-addtocart-button" onClick = {handleAddCartClick} type = "submit"> Add To Cart  </button>
      <i className ="sp-heart fa-regular fa-heart fa-2x"></i>
    </div>
    </div>
    </div>
    </div>
  )
}

//TODO options are a little weird now, if there are more options then one, like an array, i should implement same for each element
//TODO const colors = ["red", "blue", "lightblue"];
//TODO {colors.map((color) => (
//TODO   <option key={color} value={color}>
//TODO   {color}
//TODO </option>
//TODO ))}

//TODO But in this case, i should have store my colors in a "colors" key and as value, requires an array of strings like ["red", "blue", "lightblue"]
//TODO and fetch those datas from database as "const availableColors = product.colors". Then run map function with availableColors.
//** all mentioned are stands for both colors and sizes. */ 

export default SingleProductShow;

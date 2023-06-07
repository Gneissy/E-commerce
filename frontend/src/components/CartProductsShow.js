import React from "react";
import "./CartProductsShow.css"
import { useSelector } from "react-redux";


function CartProductsShow( {product, handlePlusClick, handleMinusClick, handleTrashClick} ){


  return (
    <div className = "cart-products-container">
      <div className = "cart-products-wrapper">
        <div className = "cart-products-image-container">
          <img className = "cart-product-img" src = {product.img} />
        </div>
        <div className = "cart-products-details-container">
            <p className = "cart-products--title" > {product.title} </p>
            <div className="cart-products-properties-container">
                {product.size && (
                  <p className="cart-products--size">{product.size}</p>
                )}
                {product.color && (
                  <p className="cart-products--color">{product.color}</p>
                )}
            </div>
            <div className = "cart-products-quantity-container">
              <i className = "cart-products-quantity-change fa-solid fa-minus" onClick = { handleMinusClick } value = { product._id }></i>
              <p className = "cart-products-quantity"> {product.count} </p>
              <i className = "cart-products-quantity-change fa-solid fa-plus" onClick = { handlePlusClick } value = { product._id }></i>
              <i className = "fa-sharp fa-solid fa-trash trashbin" onClick = { handleTrashClick } value = { product._id }></i>
            </div>
            <div className = "cart-products-price-container">
              <p className = "cart-products-price-text"> {(product.price * product.count).toFixed(2)} $ </p>
            </div>
        </div>
      </div>
    </div>

  );
}

export default CartProductsShow;

import React from "react";
import "./ProductsShow.css";
import { Link } from "react-router-dom";

function ProductsShow( {product} ){

  const handleHeartClick = function(event){
    console.log("Heart is clicked");
    const element =  event.target;
    if(!element.classList.contains("fa-solid")){
      element.classList.add("fa-solid");
    } else{
      element.classList.remove("fa-solid");
    }
  }

  // fa-solid for heart works.
  return(
    <div className = "individual-product-wrapper" key={product._id}>
        <div className="product-image-wrapper">
          <Link className = "link" to = {`/product/${product._id}` }>
            <img className = "product-image" src= {product.img} loading="lazy" alt={product.title} />
          </Link>
            <i onClick = { handleHeartClick } className= "heart-icon fa-regular fa-heart fa-2x"></i>
          </div>
        <div className = "product-details-wrapper">
          <Link className = "link" to = {`/product/${product._id}`} style={{ textDecoration: 'none' }} >
            <p className = "product-title"> {product.title} </p>
          </Link>
          <p className = "product-price"> {(product.price).toFixed(2)} $</p>
          
          <Link className = "link" to = {`/product/${product._id}` }>
            <a className = "plus-icon fa-solid fa-plus"></a>
          </Link>
        </div>
    </div>
  )
}



export default ProductsShow;

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/ProductsList";
import Categories from "../components/Categories";

function HomePage(){
  return (
    <div>
      <Categories />
      <ProductList />
    </div>
  )
}

export default HomePage;

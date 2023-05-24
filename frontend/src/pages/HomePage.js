import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductsList from "../components/ProductsList";

function HomePage(){
  return (
    <div>
      <Navbar />
      <ProductsList />
      <Footer />
    </div>
  )
}

export default HomePage;

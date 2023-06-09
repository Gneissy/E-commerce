import react from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

function Categories(){

    return (
        <div className = "categories-wrapper"> 
            <div className = "categories-title-container">
                <h1>Categories</h1>
            </div>
                <div className = "categories-content-wrapper">
                    <div className = "categories-grid">
                        <Link to = "/products/gaming" className = "category-link">
                            <img className = "category-img" src="https://images.unsplash.com/photo-1633545499432-285bae66cbf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80" />
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Gaming Accessories </h2>
                                <p className = "card-body-description"> Many gaming accessories you dream for. </p>
                            </div>
                        </Link>
                        <Link to = "/products/health" className = "category-link">
                            <img className = "category-img" src="https://images.unsplash.com/photo-1577467014911-2c66a5c1995a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Health & Personal Care</h2>
                                <p className = "card-body-description"> Find your essential health and personal care products for a better lifestyle. </p>
                            </div>
                        </Link>
                        <Link to = "/products/technology" className = "category-link">
                            <img className = "category-img" src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Technology </h2>
                                <p className = "card-body-description"> Discover the latest tech gadgets and electronics for a connected world. </p>
                            </div>
                        </Link>
                        <Link to = "/products/clothes" className = "category-link">
                            <img className = "category-img" src="https://images.unsplash.com/photo-1615420733091-6b320329987b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Clothes & Fashion </h2>
                                <p className = "card-body-description"> Express your style with trendy clothing and fashion accessories for every occasion. </p>
                            </div>
                        </Link>
                        <Link to = "/products/kitchen" className = "category-link">
                            <img className = "category-img" src="https://images.unsplash.com/photo-1556910096-6f5e72db6803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Kitchen </h2>
                                <p className = "card-body-description">  Explore a world of culinary possibilities with our extensive range of kitchen products.  </p>
                            </div>
                        </Link>
                    </div>
            </div>
        </div>
    );
}

export default Categories;
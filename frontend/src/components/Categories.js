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
                            <img className = "category-img" src="https://img.freepik.com/free-photo/gaming-setup-with-computer-chair_23-2149829122.jpg?w=1380&t=st=1686065808~exp=1686066408~hmac=e9ccc2cd29b9e8077787dd6830ab52ab31554fc7923b0822bc102cf4985839d3"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Gaming Accessories</h2>
                                <p className = "card-body-description"> Many gaming accessories you dream for.</p>
                            </div>
                        </Link>
                        <Link to = "/products/health" className = "category-link">
                            <img className = "category-img" src="https://img.freepik.com/free-photo/zero-waste-beauty-products_23-2149304150.jpg?w=1380&t=st=1686065875~exp=1686066475~hmac=b76beb0e531d373958743314bc9322e208db190d3cba016c7b3cc433ec7c7291"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Health & Personal Care</h2>
                                <p className = "card-body-description"> Find your essential health and personal care products for a better lifestyle. </p>
                            </div>
                        </Link>
                        <Link to = "/products/technology" className = "category-link">
                            <img className = "category-img" src="https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309641.jpg?w=740&t=st=1686066142~exp=1686066742~hmac=9013f8abff8de5da54b1e0b0a5ad3023ea6140a9b465c1392240cb71d371c89d"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Technology </h2>
                                <p className = "card-body-description"> Discover the latest tech gadgets and electronics for a connected world. </p>
                            </div>
                        </Link>
                        <Link to = "/products/books" className = "category-link">
                            <img className = "category-img" src="https://img.freepik.com/free-photo/supplies-composition-with-blue-background-top-view_23-2149491452.jpg?w=1380&t=st=1686066907~exp=1686067507~hmac=90e46afb215b3ac9a1c45e9c38d6c492131a41afcf64e01f8139c786f074ed1c"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Kitchen </h2>
                                <p className = "card-body-description"> !!!!! Dive into captivating stories and enrich your knowledge with our wide selection of books. </p>
                            </div>
                        </Link>
                        <Link to = "/products/clothes" className = "category-link">
                            <img className = "category-img" src="https://img.freepik.com/free-photo/flat-lay-woman-style-accessories-red-knitted-sweater-checkered-shirt-denim-jeans-black-leather-boots-hat-autumn-fashion-trend-view-from-vintage-photo-camera-traveler-outfit_285396-5100.jpg?w=1380&t=st=1686066812~exp=1686067412~hmac=66323a7a7dd7c4f6fda68ced806e71e84aefcbd8a72892c78dbe51c2969eacac"/>
                            <div className = "card-body">
                                <h2 className = "card-body-title"> Clothes & Fashion </h2>
                                <p className = "card-body-description"> Express your style with trendy clothing and fashion accessories for every occasion. </p>
                            </div>
                        </Link>
                    </div>
            </div>
        </div>
    );
}

export default Categories;
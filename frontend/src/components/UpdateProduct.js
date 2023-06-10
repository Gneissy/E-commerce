import { useState } from "react";
import "./AddNewProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { userRequest } from "../reqMethods";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addNotification } from "../store";

function AddNewProduct(){

    //! Updating is not ok now. Works like put, not patch.
    //! Without uploading an image, can't update.



    // Fetching current user from Redux store
    // The object's "accessToken" property will be used 
    // While sending headers: {TOKEN: ...}
    const user = useSelector(function (state){
        return state.user.currentUser;
    });
    // console.log(user); // Gives the current user

    // To be able to dispatch anywhere from app
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Getting "product" object from location,
    // Which i sent in SingleProductShow.js's handleUpdateProductClick function
    const location = useLocation();
    const { product } = location.state;
    console.log(product);
    

    // States
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description); 
    const [price, setPrice] = useState(product.price);
    const [size, setSize] = useState(product.size);
    const [color, setColor] = useState(product.color);
    const [categories, setCategories] = useState(product.categories);
    const [imgURL, setImgURL] = useState(product.img);


    // Event handlers
    const handleTitleChange = function(event){
        setTitle(event.target.value);
    }
    const handleDescriptionChange = function(event){
        setDescription(event.target.value);
    }
    const handleCategoriesChange = function(event){
        let cat = event.target.value.split(",");
        setCategories(cat);
    }
    const handleSizeChange = function(event){
        setSize(event.target.value);
    }
    const handleColorChange = function(event){
        setColor(event.target.value);
    }
    const handlePriceChange = function(event){
        setPrice(event.target.value);
    }
    const handleImgChange = function(event){
        setImgURL(event.target.value);
    }
   
    const handleUpdateProduct = async function(event){
        event.preventDefault();
     
        const updatedProduct = {
            title: title,
            description: description,
            categories: categories,
            size: size,
            color: color,
            price: price,
            img: imgURL
        };
        console.log(updatedProduct); // It is a whole new product object.

        const result = await userRequest.patch(`/products/${product._id}`, updatedProduct, { // Could've used axios.post("http:localhost:3001/api/products")
            headers: { // Sending the token to prove i'm authorized //? solved this way
                TOKEN: `Bearer ${user.accessToken}`
              }
        });
        if (result.status === 200){
             // For notification
            dispatch(addNotification(`✔ ${product.title} is successfully updated.`));
            // Redirect to main page
            navigate("/");
        }
    }

    return (
        <div className = "new-product-wrapper">


            <form className = "new-product-form">

                    <h1> Update product</h1>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Title:</label>
                        <input type = "text" name="title" placeholder= {product.title} value = {title} onChange = {handleTitleChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Description:</label>
                        <textarea type = "text" name="description" placeholder={product.description} value = {description} onChange = {handleDescriptionChange}></textarea>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Categories:</label>
                        <input type = "text" name="categories" placeholder={product.categories} value={categories} onChange = {handleCategoriesChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Size:</label>
                        <input type = "text" name="size" placeholder={product.size} value = {size} onChange={handleSizeChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Color:</label>
                        <input type = "text" name="color" placeholder={product.color} value = {color} onChange = {handleColorChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Price:</label>
                        <input type = "number" name="price" placeholder={product.price} value = {price} onChange = {handlePriceChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Image:</label>
                        <input type = "text" name="img" placeholder={product.img} value = {imgURL} onChange = {handleImgChange}></input>
                    </div>
                
                    <div className = "new-product-create-button-container">
                        <button className = "new-product-add-button" type = "submit" name="submit" onClick = {handleUpdateProduct}> Update </button>
                    </div>
            </form>
        </div>
    );
}

export default AddNewProduct;
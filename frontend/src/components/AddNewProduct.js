import { useState } from "react";
import "./AddNewProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { userRequest } from "../reqMethods";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../store";

function AddNewProduct(){

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



    // States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 
    const [img, setImg] = useState();
    const [imgPreview, setImgPreview] = useState();
    const [price, setPrice] = useState();
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [categories, setCategories] = useState([]);
    const [dragOver, setDragOver] = useState(false);

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
   

    // Handling file uploading for img
    const handleFileUpload = function(event){
        const selectedFile = event.target.files[0];
        setImg(selectedFile);
        handlePreview(selectedFile);
        
    };
    const handlePreview = function(file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleDragOver = function(event) {
        event.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = function(event) {
        event.preventDefault();
        setDragOver(false);
    };
    const handleDrop = function(event) {
        event.preventDefault();
        setDragOver(false);
        const selectedFile = event.dataTransfer.files[0];
        setImg(selectedFile);
        handlePreview(selectedFile);
    };
    const handleCreateProduct = async function(event){
        event.preventDefault();
        // console.log(title, description, img, categories, size, color, price);
        // To have completely unique file names:

        const fileName = new Date().getTime() + img.name;
        // console.log(fileName); // Example output: 1684955416834at-3 cropped.jpg

        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, img);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
                case "paused":
                console.log("Upload is paused");
                break;
                case "running":
                console.log("Upload is running");
                break;
                default:
            }
            },
            (error) => {
            // Handle unsuccessful uploads
            }, async function(){
                // Handling successful upload
                // An example output of downloadURL: https://firebasestorage.googleapis.com/...
                // Here "downloadURL" is my new "src" that we use on recording in my database.
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const product = {
                        title: title,
                        description: description,
                        img: downloadURL,
                        categories: categories,
                        size: size,
                        color: color,
                        price: price
                    };
                    console.log(product); // It is a whole new product object.

                    // TODO Send product and create a product in database.
                    // TODO Problem here is to have an "unauthorized" error, due to token issues.
                    // TODO For some reason, i couldn't handle using "userRequest", will check later on
                    const productCreated = await userRequest.post("/products", product, { // Could've used axios.post("http:localhost:3001/api/products")
                        headers: { // Sending the token to prove i'm authorized //? solved this way
                            TOKEN: `Bearer ${user.accessToken}`
                          }
                    });
                    if (productCreated.status === 201){
                         // For notification
                        dispatch(addNotification(`${product.title} is successfully created and saved in database.`));
                        // Redirect to main page
                        navigate("/");
                    }
                });
            }
      );
    };



    // Control purposes
    // console.log(img);

    return (
        <div className = "new-product-wrapper">


            <form className = "new-product-form">

                    <h1> Create a new product</h1>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Title:</label>
                        <input type = "text" name="title" placeholder="Blaze designed car" value = {title} onChange = {handleTitleChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Description:</label>
                        <textarea type = "text" name="description" placeholder="A real cool looking t-shirt that'll blow your mind." value = {description} onChange = {handleDescriptionChange}></textarea>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Categories:</label>
                        <input type = "text" name="categories" placeholder="t-shirt, clothes" value={categories} onChange = {handleCategoriesChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Size:</label>
                        <input type = "text" name="size" placeholder="xs" value = {size} onChange={handleSizeChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Color:</label>
                        <input type = "text" name="color" placeholder="red" value = {color} onChange = {handleColorChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Price:</label>
                        <input type = "number" name="price" placeholder="100" value = {price} onChange = {handlePriceChange}></input>
                    </div>
                    <div className = "new-product-individual-part">
                        <label className = "new-product-label">Img:</label>
                        <div
                            className={`new-product-drag-drop-area ${dragOver ? 'new-product-dragged-over' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input type="file" name="img" onChange={handleFileUpload} />
                            {imgPreview 
                                ? (
                                <div className = "new-product-image-preview-container">
                                    <img src={imgPreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                                </div>
                                ) 
                                : (
                                <div className = "new-product-uploading-container">
                                    <p className = "new-product-uploading-text" >Drag and drop image file here.</p>
                                    <i class="fa-solid fa-file-arrow-up fa-4x"></i>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className = "new-product-create-button-container">
                        <button className = "new-product-add-button" type = "submit" name="submit" onClick = {handleCreateProduct}> Create </button>
                    </div>
            </form>
        </div>
    );
}

export default AddNewProduct;
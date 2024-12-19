import "./styles/addProduct.css";

import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/admin/addProductSlice";
import { useNavigate } from "react-router-dom";

export default function AddProduct(){

    const [prodName, setProdName] = useState("");
    const [prodBrand, setProdBrand] = useState("");
    const [prodPrice, setProdPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [stock, setStock] = useState(0);
    const [stockAndSize, setStockAndSize] = useState([])
    const [prodImage, setProdImage] = useState("");
    const [prodDiscount, setProdDiscount] = useState(0);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id)
    const selector = useSelector(state => state.persistedReducer.addProductSlice.products)
    console.log(selector);
    console.log("size",size);

    // let stockAndSize = []
    console.log(stockAndSize);

    const formData = new FormData();
    
    // newSize=newSize.split();

    formData.append("name", prodName);
    formData.append("brand", prodBrand);
    formData.append("price", prodPrice);
    formData.append("category", category);

    stockAndSize.forEach((sizeStock) => {formData.append("sizeAndStock", JSON.stringify(sizeStock))})
    // formData.append("sizeAndStock", JSON.stringify(stockAndSize));
    // formData.append("stock", storeStock);
    formData.append("description", description);
    formData.append("image", prodImage);
    formData.append("discount", prodDiscount);
    
    const addProducts = async () => {

        try{

            const response = await axios.post(`http://localhost:4000/createProduct?adminId=${adminId}`,  formData, {withCredentials: true})
            console.log(response);
            dispatch(addProduct(response.data.productCreated))
            setSuccessMsg(response.data.message)
            console.log(selector);

            navigate("/admin/allProducts")
        }

        catch(e){
            console.log(e);
            setError(e.message)
        }
    }

    // const sizeSet = (e) => {
    //   setSize( e.target.innerText)
        
       
    //     console.log(size);
    // }

    const saveSizeStock = () => {
        setSize("");
        setStock("");

        let stockSize = {[size]: stock}
        console.log(stockSize);

        setStockAndSize((prev) => [...prev, stockSize]);

        

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        addProducts();

        setProdName("");
        setProdBrand("");
        setProdPrice("");
        setCategory("");
        setProdImage("");
        setProdDiscount(0);
        setDescription("");

    }


    
    return(
        <>
        <div className="main-div">
            <div className="prodDiv">
                <h2 className="adpTitle">Hey Admin! Add your <span className="title">Products Here</span></h2>

                <form className="prodForm" action="post" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input className="ptName" type="text" placeholder="Product name..." required value={prodName} onChange={(e)=> setProdName(e.target.value)}/>
                    <input className="ptBrand" type="text" placeholder="Product brand..." required value={prodBrand} onChange={(e)=> setProdBrand(e.target.value)}/>
                    <input className="ptPrice" type="number" placeholder="Price" required min={0} value={prodPrice} onChange={(e)=> setProdPrice(e.target.value)}/>

                    <select name="category"  className="ctgry"  required value={category} onChange={(e)=> setCategory(e.target.value)}>
                        <option>Sports wear</option>
                        <option>Cropped</option>
                        <option>Full Sleeve</option>
                        <option>Half sleeve</option>
                        <option>Hoodie</option>
                        <option>Sleeveless</option>
                    </select>

                    {/* <ul>
                        <li className="size"><button className="sBtn" type="button" onClick={sizeSet}>XS</button></li>
                        <li className="size"><button className="sBtn" type="button" onClick={sizeSet}>S</button></li>
                        <li className="size"><button className="sBtn" type="button" onClick={sizeSet}>M</button></li>
                        <li className="size"><button className="sBtn" type="button" onClick={sizeSet}>L</button></li>
                        <li className="size"><button className="sBtn" type="button" onClick={sizeSet}>XL</button></li>
                        <li className="size"><button className="sBtn" type="button" onClick={sizeSet}>XXL</button></li>
                        
                    </ul> */}

                   <div>
                    <label className="sizeLabel">Size <input className="size" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)}/></label> <label className="stockLabel">Stock <input className="stock" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)}/></label> <button type="button" className="savBtn" onClick={saveSizeStock}>Save</button>
                    </div> 

                    <input type="text" className="desc" placeholder="Product Description Here..." value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <input type="file" name="image" className="ptImage"  onChange={(e)=> setProdImage(e.target.files[0])}/>
                    <input type="number" className="ptDisc" placeholder="Product Discount if any" value={prodDiscount} onChange={(e)=> setProdDiscount(e.target.value)}/>

                    <button className="addBtn" type="submit">Add Product</button>
                </form>
                <p>{successMsg}</p>
                <p>{error}</p>
                
            </div>
        </div>
        </>
    )
}
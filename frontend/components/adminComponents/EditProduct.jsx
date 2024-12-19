import "./styles/editProduct.css";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { updateProduct } from "../../features/admin/addProductSlice";
// display all products as cards with 2 buttons one is edit and delete 
export default function EditProduct(){

    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [image, setImage] = useState("");
    const [successMsg, setSuccessMsg] = useState("")

    let {prodId} = useParams();
    console.log(prodId.slice(1));
    prodId = prodId.slice(1)


    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id);
    const dispatch = useDispatch();
    

    const updateProduct = async () => {

        const formData = new FormData();

        formData.append("category", category)
        formData.append("price", price)
        formData.append("discount", discount)
        formData.append("image", image)

        console.log(image);

        try{

        const response = await axios.put(`http://localhost:4000/updateProductById/?adminId=${adminId}&prodId=${prodId}`,formData, {withCredentials: true})
        console.log(response);
        setSuccessMsg(response.data.message)

        dispatch(updateProduct(response.data.productUpdated))

        }

        catch(e){
            console.log(e);
        }

    }

    const handleClick = () => {
        updateProduct();
        setCategory("");
        setPrice(0);
        setDiscount(0);
        setImage("");

    }

    return(

        <>

        <Link to="/admin/allProducts">
        <p className="backArw">←</p></Link>
        <div className="main-div">
           
            <div className="edit-div">
            <h2 className="editPHdng">You can update your product details here</h2>
              <label> Category: <input type="text" className="cat" value={category} onChange={(e) => setCategory(e.target.value)}/> </label>  
              <label> Price: <input type="number" className="price" value={price} onChange={(e) => setPrice(e.target.value)}/> </label> 
              <label> Discount: <input type="number" className="disc" value={discount} onChange={(e) => setDiscount(e.target.value)}/></label> 
              <label> Image: <input type="file" name="image" className="p-img" onChange={(e) => setImage(e.target.files[0])}/> </label> 

                <button type="button" className="updateBtn" onClick={handleClick}>Update Product</button>
            </div>
            <p>{successMsg}</p>
        </div>
        </>
    )
}
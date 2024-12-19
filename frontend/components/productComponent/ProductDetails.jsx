import axios from "axios";
import { useState, useEffect } from "react";
import { AddToCart } from "../../methods/AddToCart";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import "./productDetails.css";
import { addedToCat } from "../../features/cart/cartSlice";


export default function ProductDetails() {

    
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [productToCart, setProductToCart] = useState({});
    let [size, setSize] = useState([]);
    const [enteredSize, setEnteredSize] = useState("")
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState(null)

    let {id} = useParams();
    id = id.slice(4);
    const navigate = useNavigate();

    const userId = useSelector(state => state.persistedReducer.userAuthSlice.userData?._id)
    console.log(userId);
    const totalAmt = useSelector(state => state.persistedReducer.cartSlice)
    console.log(totalAmt);
    const dispatch = useDispatch()
    

    useEffect( () => {

        const getProductDetails = async () => {

            try {

                console.log("try");

                const response = await axios.get(`http://localhost:4000/getProductById/?prodId=${id}`, {withCredentials: true});
                console.log(response);
                setProduct(response.data.getProdById);
                console.log(response.data.getProdById.sizeAndStock);
                setSize(response.data.getProdById.sizeAndStock);
                let val = size;
                console.log("mods",val);
                

            }

            catch(e) {
                console.log(e);
                // setError(e.response.data.message)
            }
        }

        getProductDetails();

        }, []);

        // const selectSize = () => {



        // }

        const handleBuyNow = async () => {

            try {

                if(userId){

                // const response = await axios.post(`http://localhost:4000/addToCart/?prodId=${id}&userId=${userId}`, {quantity: quantity, size: enteredSize}, {withCredentials: true});
                size = enteredSize

                AddToCart(id, quantity,userId, size ).then((res)=> setProductToCart(res.data.productAdded)).catch((e)=>setError(e.data.message))
                // console.log(response);
                }
            }

            catch(e) {
                console.log(e);
            }

            navigate(`/user/order/:id=${id}`)

        }

        const addItemToCart = async () => {

            try {
                console.log(enteredSize);

                if(userId){

                const response = await axios.post(`http://localhost:4000/addToCart/?prodId=${id}&userId=${userId}`, {quantity: quantity, size: enteredSize}, {withCredentials: true});
                

                console.log(response)
                setSuccessMsg(response.data.message + "🛒")

                setProductToCart(response.data.productAdded)
                dispatch(addedToCat(response.data.productAdded))

                }

                else 
                navigate("/userLogin")
            }

            catch(e) {
                console.log(e);
                setError(e.response.data.message)
            }

        }

        const handleCart = () => {
            addItemToCart();

        }



    return (

        <div className="detailDiv">
            <div className="productDiv">
                
                <div className="imgDiv">
                <img className="prodImage" src={product.images} alt="" width={450} />
                </div>

                <div className="productDetDiv">
                <p className="productName">{product.name}</p>
                <p className="productPrice">MRP ₹{product.price}</p>
                <p>Product Details</p>
                <p className="pCategry">Category <br/> <span className="spanDetails"> {product.category}</span></p>
                <p className="pBrand">Brand <br/> <span className="spanDetails">{product.brand}</span> </p>
                <p className="pDesc">Description <br/> <span className="spanDetails">{product.description}</span></p>

                <ul className="size">
                    <li>Size</li>
                    {size.map((s, i) => (
                        <li key={i} className="sizeList"><button type="sizeBtn" onClick={(e) => setEnteredSize(e.target.innerText)}>{Object.keys(s)}</button></li>
                    ))}
                </ul>

                <button className="buyBtn" onClick={handleBuyNow}>Buy Now</button>
                <button className="addToCart" onClick={handleCart}>Add To Cart</button> <label>Qty: <input type="number" className="qty" min={1} max={10} value={quantity} onChange={(e) => setQuantity(e.target.value)}/></label>

                <p className="cartMsg">{successMsg}</p>
                <p className="errMsg">{error}</p>
                </div>

            </div>
        </div>
    )

}
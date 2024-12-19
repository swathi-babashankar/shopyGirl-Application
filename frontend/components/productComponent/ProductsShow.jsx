import { Link, useNavigate } from 'react-router-dom';
import {AddToCart} from '../../methods/AddToCart.js';
import './products.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ProductShow({name, price, images, _id}) {

   const [qty] = useState(1);
   const [size] = useState("S")
   const [prod, setProd] = useState();
   const [error, setError] = useState(null);
   const userId = useSelector(state => state.persistedReducer.userAuthSlice.userData?._id);

   const navigate = useNavigate()


    const handleAddToCart = () => {
        if(userId){
        AddToCart(_id, qty, userId, size).then((res)=> setProd(res.data.productAdded)).catch((e) =>setError(e.response.message) )
        // console.log(prod);
        }

        else{
            navigate("/userLogin")
        }
    }


    return(
        
        <div className="show-div">
            
            <div className="card-div">
            <Link to={`/productDetails/:id=${_id}`}>
                <img className="pImg" src={images} alt="" width={150} height={150}/>
            </Link>
                <p className="pdName">{name}</p>
                <p className="pdPrice">Rs.<span> {price}</span></p>
                <button className="addCart" onClick={handleAddToCart}>Add To Cart</button>  <Link to={`user/order/:id=${_id}`}> <button className="buynow">Buy Now</button> 
                </Link>
            </div>  
            <p>{error}</p>
        </div>
      
    )
}
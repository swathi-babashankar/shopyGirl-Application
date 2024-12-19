import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../features/cart/cartSlice';
import './cart.css';
import { useEffect, useRef, useState } from 'react';

export default function  Cart({ product, quantity, size, _id }){

    const [qty, setQty] = useState(quantity);
    const [error, setError] = useState(null);
    const [sizePop, setSizePop] = useState(false);
    let [prodSizes, setProdSizes] = useState([]);
    const [updatedSize, setUpdatedSize] = useState(size);
    let ref = useRef()

    let { id } = useParams();
    id = id?.slice(4);
    
    console.log("cart prodId", _id, id);
    const dispatch = useDispatch();
    
    

    const updateQuantity = async () => {

        try {

            const response = await axios.put(`http://localhost:4000/editCart/?prodId=${_id}&userId=${id}`, {quantity: qty, size: updatedSize}, {withCredentials: true});
            console.log(response);
            
        }

        catch(e) {

            console.log(e);
        }
    }

    useEffect( () => {

        updateQuantity();
        
        setProdSizes(product[0].sizeAndStock)
        console.log(product[0].sizeAndStock);

        if(sizePop){
            ref.current?.showModal()
        }

        else {
            ref.current?.close()
        }

    }, [qty, updatedSize, sizePop])

    

    const deleteCartItem = async () => {

        try {

            const response = await axios.delete(`http://localhost:4000/deleteCartItem/?prodId=${_id}&userId=${id}`, {withCredentials: true});
            console.log(response);

            dispatch(removeFromCart(response.data.prodDeleted._id));
            
        }

        catch(e) {
            console.log(e);
        }
    }

    const handleDelete = () => {
        deleteCartItem();

        location.reload();
    }

    return(

        <div className="main-div">
            <div className="cart-div">
                {/* check if there is anything in cart if nothing display "YOUR CART IS EMPTY" */}
                {/* This div will be inside map to shoe the products added to  cart  */}
                <div className="cCard">
                    <img className="cpImg" src={product[0].images} alt="" width={300} />

                    <div className="prodInfo">
                      <p className="cpName">{product[0].name}</p>
                      <div className='cartSize'> <span>Size: <input type="button" value={size} onClick={()=>setSizePop(true)}/></span> </div>

                      <label>Qty <input type="number" name="quantity" className="qty" min={1} max={10} value={qty} onChange={(e)=> setQty(e.target.value)} /></label>
                      <p className="cpPrice">₹ {product[0].price}</p>
                      
                    </div>

                    <button className="removeBtn" onClick={handleDelete}>Remove <span className="emo"> ×</span></button>
                </div>
                
            </div>

            {sizePop && 

            <dialog id='sizePop'  ref={ref} onClickCapture={() =>setSizePop(false)}>
             <h5>Size</h5>
             {prodSizes.map((size, i) => 
  
             <li key={i} className="sizeLists"><button type="sizeBtns" onClick={(e) => setUpdatedSize(e.target.innerText)}>{Object.keys(size)}</button></li>
      
             )}

            </dialog>

          }
        </div>


    )
}
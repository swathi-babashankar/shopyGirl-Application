// APIs, logic and component comes in this file 
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  Cart from "../components/cartComponent/Cart";
import "./style/cartPage.css";
import TotalAmtDetails from "../components/orderComponent/TotalAmtDetails";
import { Link } from "react-router-dom";

export default function CartPage() {

    let cookievalue = document.cookie.match("token");
    console.log(cookievalue);

    const [cartProducts, setCartProducts] = useState([]);
    // const [totalAmt, setTotalAmt] = useState(0)
    const [error, setError] = useState("");

    const userId = useSelector(state => state.persistedReducer.userAuthSlice.userData?._id);

    useEffect( () => {

        const showCartItems = async () => {

            try {

                const response = await axios.get(`http://localhost:4000/getItemsByUserId/?userId=${userId}`, {withCredentials: true});
                console.log(response);

                setCartProducts(response.data.userCartItems);
                // totalAmt = response.data.totalAmtOfItems;
            }

            catch(e) {

                console.log(e);
                setError(e.response.data.message);

            }
        };

        showCartItems();

    }, [])

    return(
        
        <div className="cpMainDiv">
            
        { cartProducts.length!==0 ?<>
        
        <div className="cartPageDiv" >
            { cartProducts.map(
                (cartProduct, i,) => (
                    
                    <Cart key={i} {...cartProduct} />
                    
                )
            )}
            {error}
            <div className="orderBtnDiv">
            <Link to={`/user/order`}>
                <button className="cartOrderBtn" type="button">Place Order</button>
                </Link>
            </div>
            
        </div>
        <div className="amtDiv">
        <TotalAmtDetails/>
        </div></>
        : <h2 className="emptyCart">Your Cart is Empty☹️</h2>
        
}
        

        </div>
        
    )
    
}
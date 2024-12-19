// Show all orders of the particular user
import { useEffect, useState } from "react";
import "./styles/viewOrder.css";
import axios from "axios";
import { useSelector } from "react-redux";
export default function ViewOrders({ realProductId, createdAt }){

    const [orderedProduct, setOrderedProduct] = useState({});
    
    // console.log(realProductId);

    // const selector = useSelector(state => state.persistedReducer.orderSlice?.orders);
    // console.log("selector order product", selector);

    

    useEffect( () => {

        

        const getOrderedProduct = async () => {

            try {
                
    
                // const response = await axios.get(`http://localhost:4000/getItemById/?prodId=${productId}`, {withCredentials: true})
                
                // Grab the prodId from cartItem.product[0]._id
                // API request to getProdById
                // Show the data returned 
                // console.log(response.data.cartItem?.product[0]._id);
                // const prodId = response.data.cartItem?.product[0]._id;

                const productOrdered = await axios.get(`http://localhost:4000/getProductById/?prodId=${realProductId}`) ;
                // const itemFromstore = localStorage.getItem("productOrdered");
                //  console.log("itemFromStorsge", itemFromstore);
                 setOrderedProduct(productOrdered.data.getProdById);
                

                

                // setOrderedProduct(productOrdered.data.getProdById);
                
    
            }
    
            catch(e) {
                console.log(e);
            }
        }

        // 

        getOrderedProduct();

    }, [])

    

    return(

        <div className="main-div">
            
            <div className="uview-div">
                <img className="p-img" src={orderedProduct.images} alt={orderedProduct.name} />
                <p className="oName">{orderedProduct.name}</p>
                <p className="oPrice"> ₹ {orderedProduct.price}</p>
                <p className="oDate">Ordered on: {createdAt}</p>
            </div>
          
        </div>
    )
}
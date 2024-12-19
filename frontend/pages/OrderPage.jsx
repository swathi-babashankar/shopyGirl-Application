import "./style/orderPage.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ViewOrders from "../components/orderComponent/ViewOrder";



export default function OrderPage() {

    const [allOrders, setAllOrders] = useState([]);
    const userId = useSelector(state => state.persistedReducer.userAuthSlice.userData?._id)

    useEffect( () => {

        const getAllOrders = async () => {

            try {

                const response = await axios.get(`http://localhost:4000/getAllOrders/?userId=${userId}`, { withCredentials: true });

                console.log(response);
                setAllOrders(response.data.allOrders);

            }

            catch(e) {
                console.log(e);

            }
        }

        getAllOrders();

    }, [])

    return (

        <div className="allOrders"> 
        <h2 className="custOrder">All Orders</h2>
        
        {allOrders.length== 0? <h2 className="zeroHdng">You 🫵🏼 Have ZERO Orders... ☹️!</h2>:
        
        allOrders.map( (order, i) => (
            
            <ViewOrders {...order} key={i}/>
        )) }
        
        
        </div>

       
    )
}
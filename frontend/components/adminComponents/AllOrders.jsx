import "./styles/allOrders.css"
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import UserDetails from "./UserDetails";

export default function AllOrders() {

    const [ allOrders, setAllOrders] = useState([]);
    const [orderedUser, setOrderedUser] = useState([]);
    const [showPop, setShowPop] = useState(false);
    const ref = useRef()

    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id);

    useEffect( () => {

        const getAllOrders =  async () => {

        try {

        const orders = await axios.get(`http://localhost:4000/admingetAllOrders/?adminId=${adminId}`, {withCredentials: true})
        setAllOrders(orders.data.getProds)
        setOrderedUser(orders.data.allOrders)

        console.log(orderedUser);

        }

        catch(e) {
            console.log(e);

        }

        }

        getAllOrders();

        // if(showPop){
        //     ref.current?.showModal()
        // }

        // else {
        //     ref.current?.close()
        // }


    }, [])

    return(

        <div className="odMain-div">
            <h2 className="odHdng">All Orders</h2>
            {allOrders.map((order, i) => 
             (
             <div className="view-div" key={i}>
             <img className="p-img" src={order.product[0].images} alt={order.product[0].name} />
             <p className="oName">{order.product[0].name}</p>
             <p className="oPrice"> ₹ {order.product[0].price}</p>
             <p className="urSize">Size {order.size}</p>
             <p className="urQty">Qty {order.quantity}</p>
             <p className="oDate">{order.createdAt}</p>
             <button className="uDetBtn" onClick={() => setShowPop(true)} >User Details</button>

            {showPop && <div id="uDetails"  ref={ref} onClickCapture={() => setShowPop(false)}>
                <UserDetails {...orderedUser[0]} />
             </div>}

             </div>

            ))}
            
          
        </div>
    )

}
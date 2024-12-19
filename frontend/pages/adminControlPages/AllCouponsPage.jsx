import "./allCouponsPage.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllCoupons from "../../components/adminComponents/AllCoupons";
import { Link } from "react-router-dom";

export default function ViewAllCoupons(){

    const [coupons, setCoupons] = useState([]);
    const [error, setError] = useState(null);

    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id)

    useEffect( () => {

        const getAllCoupons = async () => {

            try{
                const response = await axios.get("http://localhost:4000/getCoupons", {withCredentials: true});
                console.log(response.data.coupons);
                setCoupons(response.data.coupons);

            }

            catch(e){
                console.log(e);
                setError(e.response.data.message);

            }

        };

        const deleteExpiredCoupon = async () => {

            try{

                const response = await axios.delete(`http://localhost:4000/deleteExpiredCoupon/?adminId=${adminId}`, {withCredentials: true})

                console.log(response);

            }

            catch(e){
                console.log(e);

            }

        }

        deleteExpiredCoupon();

        getAllCoupons();

    }, [])

    // useEffect( () => {

        
    // },[])

    return(
        <>

        <Link to="/admin/adminHome">
            <p className="prodBackArw">←</p>
        </Link>

        <div className="allCDiv">          
            <h2 className="couphdng">Here are All the Coupons</h2>

            {coupons.map((coupon, i) => (
                <AllCoupons {...coupon} key={i}/>
            ))}

        </div>

        </>
    )
}
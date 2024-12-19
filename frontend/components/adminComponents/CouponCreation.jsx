import './styles/couponComp.css';
import axios from 'axios';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from '../../features/admin/couponSlice';

export default function CouponCreation(){

    const [couponCode, setCouponCode] = useState("")
    const [discount, setDiscount] = useState(0);
    const [validTill, setValidTill] = useState();
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id);
    const navigate = useNavigate();

    const createCoupon = async () => {

        const data = {
            couponCode: couponCode,
            discount: discount,
            validTill: validTill
        }

        try{

            const response = await axios.post(`http://localhost:4000/createCoupon?adminId=${adminId}`, data, {withCredentials: true});
            console.log(response);
            dispatch(addCoupon(response.data.couponCreated));
            navigate("/admin/allCoupons")
            
        }

        catch(e){
            console.log(e.message);
            setError(e.response.data.message)
        }
    }

    const handleClick = () => {
        createCoupon();

        setCouponCode("");
        setDiscount("");
        setValidTill("");

    }

    return(

        <>
        <Link to="/admin/adminHome">
        <p className="prodBackArw">←</p></Link>
        
        <div className="main-div">
            
            <div className="sub-div">
            <h2>Create Coupon Here...</h2>
                <input className="cCode" type="text" placeholder="Coupon Code here..." value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <input className="cDisc" type="number" placeholder="Discount percent" value={discount} onChange={(e) => setDiscount(e.target.value)}/>
                <label>Valid Till: <input type='datetime-local' className="cExp" value={validTill} onChange={(e) => setValidTill(e.target.value)}/></label>   
                <button className="sBtn" type="button" onClick={handleClick}>Create Coupon</button>
                <p>{error}</p>
            </div>

        </div>
        </>
    )
}
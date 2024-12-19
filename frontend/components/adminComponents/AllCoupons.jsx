import "./styles/allCoupons.css";
import axios from "axios"; 
import {useDispatch, useSelector } from 'react-redux';
import  { deleteCoupon } from "../../features/admin/couponSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function AllCoupons({couponCode, discount, validTill, _id}){

    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/admin/editCoupon/:${_id}?`)
        
    }

    

    const handleDelete = async () => {

        try {

            const response = await axios.delete(`http://localhost:4000/deleteCoupon/?couponId=${_id}&adminId=${adminId}`, {withCredentials: true});
            dispatch(deleteCoupon(response.data.couponDeleted._id));

            location.reload();
        }

        catch(e) {
            console.log(e);
        }
    }
    
    return(
        <div className="acDiv">
           
            <div className="subCDiv">
                <p className="coupCode">Coupon Code: <span>{couponCode}</span></p>
                <p className="coupDisc">Discount: <span>{discount} %</span></p>
                <p className="expiry">Valid Till: <span>{validTill}</span></p>
                <button className="coupEdit" type="button" onClick={handleEdit}>Edit ✏️</button>
                <button className="coupDelete" type="button" onClick={handleDelete}>Delete ❌</button>
            </div>

        </div>
    )
}
// 
// 
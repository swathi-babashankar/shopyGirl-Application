// maybe same as editUserProfile
import "./styles/editCoupon.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCoupon } from "../../features/admin/couponSlice";

export default function EditCoupon(){

    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [validTill, setValidTill] = useState();
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState(null)

    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id);
    const dispatch = useDispatch();

    let {couponId} = useParams();
    console.log(couponId);
    couponId = couponId.slice(1);

    const couponUpdate = async () => {

        const data = {
            couponCode,
            discount,
            validTill
        }

        try {

            const response = await axios.put(`http://localhost:4000/editCoupon/?couponId=${couponId}&adminId=${adminId}`, data, {withCredentials: true});
            console.log(response);

            dispatch(updateCoupon(response.data.updateCoupon));
            setSuccessMsg(response.data.message);

        }

        catch(e) {
            console.log(e);
            setError(e.response.data.message)
        }
    }

    const handleUpdate = () => {
        couponUpdate();

        setCouponCode("");
        setDiscount(0);
        setValidTill("");

              
    }

    return(
        <>
        <h2 className="editCHdng">Edit the Coupon Here...</h2>

        <div className="main-div">
         
            <div className="edits-div">
                <label htmlFor="Code">Coupon Code: <input type="text" className="code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} /> </label>
                <label>Discount: <input type="number" className="disc" value={discount} onChange={(e) => setDiscount(e.target.value)} /></label>
                <label>Valid Till: <input type="datetime-local" className="cExp" value={validTill} onChange={(e) => setValidTill(e.target.value)} /> </label>
                <button className="updatesBtn" onClick={handleUpdate}>Update Coupon</button>
                <p>{successMsg}</p>
            </div>
            <p>{error}</p>

        </div>
        </>
    )
}
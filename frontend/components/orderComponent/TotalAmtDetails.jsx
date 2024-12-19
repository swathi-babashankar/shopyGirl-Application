import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./styles/order.css";
import "./styles/amtDetails.css"
// import { useSelector, useDispatch } from "react-redux";

export default function TotalAmtDetails({price, id}) {

  const userId = useSelector(state => state.persistedReducer.userAuthSlice.userData?._id);
  console.log(userId);

    const [discPrice, setDiscPrice] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const [totalAmt, setTotalAmt] = useState();
    const [error, setError] = useState(null);
    
    useEffect( () => {
    
      if(userId!==undefined) {

      const showTotalAmt = async () => {
        
        try {
          console.log(userId);
          
            const response = await axios.get(`http://localhost:4000/getItemsByUserId/?userId=${userId}`, {withCredentials: true});
            console.log(response);
    
            setTotalAmt(response.data.totalAmtOfItems);
            // totalAmt = response.data.totalAmtOfItems;
          }
        
    
        catch(e) {
    
            console.log(e);
            setError(e.response.data.message);
    
        }
      
    };
    
    
      showTotalAmt();
  }
    

    }, [userId])
  

    const handleApply = async () => {
        setCouponCode("");
    
        // const code = {
        //   couponCode: couponCode
        // }
    
        try {
    
          const coupApply = await axios.get(`http://localhost:4000/applyCoupon/?prodId=${id}&couponCode=${couponCode}`);
          console.log(coupApply.data.price);
          setDiscPrice(coupApply.data.price);
          console.log(couponCode);
        }
    
        catch(e) {
          console.log(e);
        }
    }

    return(
        <>
         <div className="pDetails">
          <h2 style={{color: 'GrayText'}}>Price Details</h2>
          <h3 className="orderPrice">Price <span className="span" >{price || totalAmt}</span></h3>
          <h3 className="delChrge">Delivery Charge <span style={{marginLeft: 40}}> FREE </span></h3>
          <h3 className="cDiscnt">Coupon Discount <span>{discPrice}</span></h3>
          <h2 className="tPayable">Total Payable <span style={{marginLeft: 30}}>{price|| discPrice || totalAmt}</span></h2>
          <label>Coupon Code: <input className="cpCode" placeholder="coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/> </label><button className="applyBtn" type="button" onClick={handleApply}>Apply</button>
          </div>
          <p>{error}</p>
        </>
    )
}
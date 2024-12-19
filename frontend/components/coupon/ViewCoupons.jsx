import { useState, useRef, useEffect } from "react";
import "./viewCoupon.css";


export default function ViewCoupon({discount, validTill, couponCode}){

    const [coupCode, setCoupCode] = useState(couponCode);
    const [success, setSuccess] = useState("")

    const couponRef = useRef(null)

    // useEffect(())

    const copyToClipBoard = async () => {

        try {

         window.navigator.clipboard.writeText(coupCode);
        
         setSuccess('text copied');

        }

        catch(e) {
            console.log(e);
        }
     }
     
     
     
    return(

        <div className="main-div">

            <div className="cView">
                <p className="cCode">Code: <span style={{color: "teal"}} ref={couponRef}>{couponCode}</span></p>
                <button className="clip" style={{width: 100, height: 40, marginTop: 23, backgroundColor: 'transparent', border: 'none'}} onClick={copyToClipBoard}>📋</button>
                <p className="disc" ><span>{discount}%</span> Off</p>
                <p className="vDate">Valid Till: <span>{validTill}</span></p>
            </div>
         <p>{success}</p>
        </div>
    )
}

import { useEffect, useRef, useState } from "react";
import "./styles/orderInfo.css";

export default function OrderInfo({name, address, phoneNo}) {

    const  [showDetails, setShowDetails] = useState(false);
    const ref = useRef();

    useEffect( () => {

        if(showDetails) {
            ref.current?.showModal();
            
        }
        else {
            ref.current?.close();
        }

    }, [showDetails])

    return(

        <div className="orderInfo">
            <button className="infoBtn" onClick={() => setShowDetails(true)} >Delivery Info</button>
            <div className="orderInfoDiv" >
            
                <dialog id="infoDetls" ref={ref}> 
                <input type="text" className="infoName" value={name} readOnly/><button className="closeBtn" onClick={() => setShowDetails(false)}>×</button>
                <input type="text" className="infoAddress" value={address} readOnly/>
                <input type="text" className="phoneNo" value={phoneNo} readOnly/>
                </dialog>
            </div>

        </div>
    )
}
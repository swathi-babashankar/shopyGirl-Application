import { useState } from "react";
import "./styles/preview.css";


export default function ProductPreview({ name, price, brand, images}) {

    const [quantity, setQuantity] = useState(1);

    return(
        <div className="preDiv">
            <div className="preProductDiv">

                <img className="preProdImage" src={images} alt="" width={250} />
                
                <div className="preProductDetDiv">
                <p className="preProductName">{name}</p>
                <p className="preProductPrice">Price ₹{price}</p>
                <p className="preBrand">Brand: {brand}</p>
                

                <label>Qty: <input type="number" className="qty" min={1} max={10} value={quantity} onChange={(e) => setQuantity(e.target.value)}/></label>
            </div>
            </div>
        </div>

    )

}
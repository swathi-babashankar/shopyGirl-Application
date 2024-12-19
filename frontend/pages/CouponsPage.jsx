import axios from "axios";
import { useEffect, useState } from "react";
import ViewCoupons from "../components/coupon/ViewCoupons";
import "./style/couponsPage.css";

export default function CouponsPage(){

    const [coupons, setCoupons] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {

        const getAllCoupons = async () => {

            try {

                const response = await axios.get(`http://localhost:4000/getCoupons`);
                console.log(response);
                setCoupons(response.data.coupons);
            }

            catch(e) {

                console.log(e);
                setError(e.response.data.message);
            }
        };

        getAllCoupons();

    }, [])


    return (
        <div className="cpnsPage">
            <h2 className="cpnsPageHdng">Here are All the Available Coupons</h2>
            <div className="cPageDiv">
         {coupons.map((coupon, i) => (
            <ViewCoupons {...coupon} key={i}/>
         ))}
         </div>


        </div>
    )

}
import "./allProdPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AllProducts from "../../components/adminComponents/AllProducts";
import EditProduct from "../../components/adminComponents/EditProduct";
import { Link } from "react-router-dom";



export default function AllProductsPage(){

    const [products, setProducts] = useState([])

    useEffect(  () => {

        const getAllProducts = async ()=>{

        try{

            const response = await axios.get("http://localhost:4000/getProducts", {withCredentials: true})
            console.log(response);
            setProducts(response.data.getAllprods)

        }

        catch(e){
            console.log(e.message);
        }
    }

    getAllProducts();

    }, [])

    return(
        <>
        <Link to="/admin/adminHome">
        <p className="prodBackArw">←</p></Link>
        <h2 className="adminPHdng">Here are All Products</h2>
        <div className="pageDiv">
        {products.map((product, i)=>(
            // <div key={i} >
            
                <AllProducts {...product} key={i}/>
                // <EditProduct key={i}/>

        ))}

        </div>
        </>
    )
}
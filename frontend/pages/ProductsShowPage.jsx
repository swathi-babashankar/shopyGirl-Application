import "./style/productsShowPage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductShow from "../components/productComponent/ProductsShow";


//  resp = axios.get(localhost:0000/products/)
// prods = resp.prods
// prods.map((p) => <prodShow {...p}/>)

export default function ProductShowPage(){

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {

        const showAllProducts = async () => {

            try{
                const response = await axios.get("http://localhost:4000/getProducts", {withCredentials: true})
                setProducts(response.data.getAllprods)

            }

            catch(e){
                console.log(e);
                setError(e.response.data.message)
            }
        }

        showAllProducts();

    }, [])

    return(
        
        <div className="mainProdDiv">

            {products.map((product, i)=>(
                
                <ProductShow {...product} key={i}/>
               
            ))}
            <p>{error}</p>
        </div>
        
    )
}
import './search.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchResult from '../productComponent/SearchResult';


export default function Search() {

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    // const [prodIds, setProdIds] = useState([])
    
    const searchProduct = async () => {

       

        try {
           
            const response = await axios.post(`http://localhost:4000/searchProduct`, {search: search});
            console.log(response);

            setProducts(response.data.filteredProd);

            // setProdIds(response.data.filteredProd?._id)
           
        }

        catch(e) {

            console.log(e);
            setError(e.response.data.message);

        }

    }

    useEffect(() => {
        searchProduct();

    }, [search])
    

    console.log(search);
    return (
       <>
        <div>
        <input className="search" name="Search" placeholder="Search products here..."  onChange={(e) => setSearch(e.target.value)} value={search}/>
        </div>
        <div className='nameDiv'>
            {products.map((product, i) =>
            search?<SearchResult key={i} {...product} />: "")}

        </div>
        </>
    )

}
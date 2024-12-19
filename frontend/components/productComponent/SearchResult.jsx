import "./styles/searchResult.css";
import { useNavigate } from "react-router-dom";

export default function SearchResult({name, brand, _id}) {

    // const filProds = [product]
    const navigate = useNavigate();

    const handleProductSearch = () => {

        navigate(`/search/:name=${name}/:brand=${brand}/:id=${_id}`)
        
    }

    return (

        <div className="resultDiv">
            <input className="resultName" value={name} onClick={handleProductSearch} readOnly/>
        </div>

    )
}
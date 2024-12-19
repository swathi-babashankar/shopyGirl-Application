// Get all prods from backend display as cards
// every card will have edit and delete button edit will navigate to editProds page and delete btn will
// make a delete api call to backend
import "./styles/allProducts.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProduct} from "../../features/admin/addProductSlice";

export default function AllProducts({name, price, images, _id}){

    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/admin/editProduct/:${_id}?`)
    }

    const handleDelete = async () => {

        try{
        const response = await axios.delete(`http://localhost:4000/deleteProduct/?adminId=${adminId}&prodId=${_id}`, {withCredentials: true});

        console.log(_id);
        console.log(response);
        
        dispatch(removeProduct(response.data.productDeleted._id));

        location.reload();
        
        }

        catch(e){
            console.log(e.message);
        }

    }

    return(
        <div className="main-divs">
            
            <div className="prod-divs">
                <img className="prodImg" src={images} alt={name}/>
                <p className="pdName">{name}</p>
                <p className="pdPrice"> ₹ {price}</p>

              
                <button className="editBtn" type="button" onClick={handleEdit}>Edit</button>
              
                <button className="deleteBtn" type="button" onClick={handleDelete}>Delete</button>
            </div>

        </div>
    )
}
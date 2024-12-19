import "./styles/adminHome.css";
import { Link, NavLink , useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import women from "../../assets/woman.png"
import axios from "axios";
import { logout } from "../../features/admin/adminAuthSlice";

export default function AdminHome(){

    console.log("ADMINHOME");
    const adminId = useSelector(state => state.persistedReducer.adminAuthSlice.adminData.adminLoggedIn._id);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const adminLogout = async () => {

        try{

            const response = await axios.get("http://localhost:4000/adminLogout", {withCredentials: true});
            dispatch(logout());

            if(response.data){
                navigate("/")
            }

        }

        catch(e){
            console.log(e);

        }
    };

    const handleLogout = () => {
        adminLogout();


    }

    return(
        <>
        <header className="profileHeader">

            <button className="logoutBtn" onClick={handleLogout}>Logout</button>

        <Link to={`/admin/viewAdminProfile/:id=${adminId}`}>
            <img className="profile" src={women} alt="" width={45}/>
                      
        </Link>
        </header>
        
        <div className="main-div">
        

            <h3 className="adTitle">Hey Admin...! How Can I Help You</h3>
            <nav className="adNav">
                <ul>
                    
                    <li className="addPt">
                     <Link to="/admin/addProducts">
                      <button className="addPd">Add Product</button>
                     </Link>
                    </li>

                    <li className="allPt">
                     <Link to="/admin/allProducts">
                      <button className="showPd">Show Products</button>
                     </Link>
                    </li>

                    <li className="cCpn">
                    <NavLink to="/admin/createCoupon">
                      <button className="addPd" type="button">Create Coupon</button>
                    </NavLink>
                    </li>

                    <li className="allCpns">
                     <NavLink to="/admin/allCoupons">
                      <button className="allCpns">Show Coupons</button>
                     </NavLink>
                    </li>

                    <li className="allOdrs">
                     <Link to="/admin/allOrders">
                      <button className="addPd">Show Orders</button>
                     </Link>
                    </li>

                    {/* <li className="adminProf"> */}
                     {/* <Link to="/admin/viewAdminProfile">
                     <img className="profile" src={women} alt="" width={45}/>
                      
                     </Link> */}
                    {/* </li> */}




                </ul>
            </nav>
        </div>
        </>
    )
}
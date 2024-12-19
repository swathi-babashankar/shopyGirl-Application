import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import logo from '../../assets/shopping-bag-cart-svgrepo-com.svg';
import './header.css';
import profile from '../../assets/office-man.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../features/user/userAuthSlice';

export default function Header() {

    const userId = useSelector(state => state.persistedReducer.userAuthSlice.userData?._id);

    // const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    let cookievalue = document.cookie.match("token");
    console.log(cookievalue);

    if(!cookievalue || cookievalue === null)
    dispatch(logout());

    console.log(userId);

    
    const handleLogout = async () => {

        try {

            const response = await axios.get(`http://localhost:4000/userLogout/?id=${userId}`, {withCredentials: true});
            dispatch(logout())

            console.log(response);
        }

        catch(e){
            console.log(e);
        }

    }

    const handleCartBtn = () => {

        if(userId){
            navigate(`/user/:id=${userId}/viewCart`)
        }

        else {
            navigate("/userLogin")
        }
    }


    return(
        <div className="main-div">
            <nav className='navbar'>
                <ul className='ul'>
                    <li className='nav-list'>
                        <p className='logo'>ShopyGuy&apos;s <img src={logo} alt='logo' className='logoImg'/></p>
                    </li>

                    <li>
                        <Search/>
                    </li>

                    <li>
                        {/* Logic - if loggedIn then show logout bring redux state  and show myAccount*/}
                        { userId ? (
                            <button className='logout' onClick={handleLogout}>LogOut</button>
                        ) : (
                        <NavLink to='/userLogin'>
                            <button className='login' type='button'>Login</button>
                        </NavLink>
                        )}
                    </li>

                    <li>
                        {/* if not loggedin redirect to login page */}
                        
                            <button className='cartBtn' type='button' onClick={handleCartBtn}>Cart  <svg xmlns="http://www.w3.org/2000/svg" className='cartImg' width="24" height="24" version="1.2" id="shopping-cart"><path d="M20.756 5.345A1.003 1.003 0 0 0 20 5H6.181l-.195-1.164A1 1 0 0 0 5 3H2.75a1 1 0 1 0 0 2h1.403l1.86 11.164.045.124.054.151.12.179.095.112.193.13.112.065a.97.97 0 0 0 .367.075H18a1 1 0 1 0 0-2H7.847l-.166-1H19a1 1 0 0 0 .99-.858l1-7a1.002 1.002 0 0 0-.234-.797zM18.847 7l-.285 2H15V7h3.847zM14 7v2h-3V7h3zm0 3v2h-3v-2h3zm-4-3v2H7l-.148.03L6.514 7H10zm-2.986 3H10v2H7.347l-.333-2zM15 12v-2h3.418l-.285 2H15z"></path><circle cx="8.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></svg> </button>
                        
                    </li>

                    <li>
                        {/* if not loggedin redirect to login page */}
                        <div className='proDiv'>
                        {userId? (
                            <>
                         <img className='userProfile' src={profile} alt='' width={50} /> 
                           <div className='dropDown'>
                            <ul>
                                <Link to={`/user/viewUserProfile/:id=${userId}`}>
                                <li>
                                    Profile
                                </li>
                                </Link>

                                <Link to="/user/viewOrders"> 
                                <li>
                                    Orders
                                </li>
                                </Link>

                                <Link to={"/coupons/viewAllCoupons"}>
                                <li>
                                    Coupons
                                </li>
                                </Link>

              

                            </ul>

                           </div>
                           </>
                        ): ""}
                        </div>
                        
                    </li>


                </ul>
            </nav>
        </div>
    )

}

// 
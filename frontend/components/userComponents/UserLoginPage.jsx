// call reducer state store the userData  and make the loggedin true
// api call pass login  cred with axios post 
import { Link } from 'react-router-dom';
import './styles/login.css';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userAuthSlice';
import { useNavigate } from 'react-router-dom';

export default function UserLogin(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector(state => state.persistedReducer.userAuthSlice);
    console.log(selector);

    const userLogin = async () => {    

        const data = {
            email,
            password
        }


        try{

            const response = await axios.post("http://localhost:4000/userLogin", data, {withCredentials: true})
            console.log(response.data.userLoggedin);
            dispatch( login(response.data.userLoggedin))
            const id = response.data.userLoggedin._id;
            console.log(id);
            navigate("/")
        }

        catch(e){
            console.log(e);
            setError(e.response.data.message)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        userLogin();

        setEmail("");
        setPassword("");

    }

    return(
        <>
         <div className="main-div">

         <div className="form-div">
            <h2 className="hdng">Login</h2>

            <form className="logForm" action="post" onSubmit={handleSubmit}>

                <input className="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="pswd" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <button className="subBtn" type="submit">Login</button>
                
            </form>
            <h4>Dont have an account ? <Link to='/userSignup'><span className='span'>SignUp </span>  </Link> </h4>
            <p>{error}</p>
            </div>

         </div>
        </>
    )

} 
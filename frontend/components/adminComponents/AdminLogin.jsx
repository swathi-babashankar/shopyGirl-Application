import "./styles/login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../features/admin/adminAuthSlice";

// api call to backend
// redux state to login

export default function AdminLogin(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secret, setSecret] = useState("")
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const selector = useSelector(state => state.persistedReducer.adminAuthSlice)
    console.log(selector);
    const navigate = useNavigate()

    const data = {
        email,
        password,
        secret
    }

    const adminLogin = async () => {
        try {

            const response = await axios.post("http://localhost:4000/adminLogin", data, {
                withCredentials: true, 
            })
            console.log(response)
            
            if(response.data.success === true)
            dispatch(login(response.data));
            console.log(dispatch(login(response.data)));
            
            // document.cookie = "adminToken = " + response.data.adminToken + ";path=/"

            navigate("/admin/adminHome")
        }

        catch(e){
            console.log("err", e)
            setError(e.response.data.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        adminLogin();

        setEmail("");
        setPassword("");
        setSecret("");
    }

    return (
         
         <div className="main-div">
         
         <div className="form-div">
            <h2 className="hdng">Admin Login</h2>
         
            <form className="logForm" action="post"  onSubmit={handleSubmit}>

                <input className="email" placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" className="pswd" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <input type="text" className="secret" placeholder="Your Secret" value={secret} onChange={(e)=>setSecret(e.target.value)}/>
                
                <button className="subBtn" type="submit">Login</button>
                
            </form>
            <h4>Dont have an account ? <Link to='/adminSignup/secretroute121'><span className='span'>SignUp </span>  </Link> </h4>
            <p className="errmsg">{error}</p>
            </div>

         </div>
    )
}
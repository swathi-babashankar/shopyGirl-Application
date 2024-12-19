import './styles/signup.css';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { addAdminAcc } from '../../features/admin/adminSignupSlice';

export default function AdminSignup() {

    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secret, setSecret] = useState("")
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const selector = useSelector(state => state.persistedReducer.signUp)
    const navigate = useNavigate()

    console.log(selector);

    // useEffect( () => {

    //     if(selector)
    //     navigate("/admin/adminHome")

    // })
    

    const adminSignup = async () => {

        const data = {
            name,
            phoneNo,
            email,
            password,
            secret
        }

        try{

            const response = await axios.post("http://localhost:4000/createAdmin", data);
            console.log(response.data.createAdmin);

            dispatch(addAdminAcc(response.data.createAdmin));
            console.log(selector)

            if(selector)
            navigate("/admin/adminHome")
            
        }

        catch(e){
            setError(e.response.data.message);
            console.log(e);
           
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        adminSignup();

        setName("");
        setPhoneNo("");
        setEmail("");
        setPassword("");
        setSecret("");

    }
    // Logic here api call state etc
    // const response = await axios.post("api/signup")

    return(
        <div className="main-div">
            <div className="form-div">
                <h2 className="hdng">Sign Up</h2>

            <form className="signup" action="post" onSubmit={handleSubmit}>

                <input className="name" required placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                <input type="text" className="pNo" placeholder="PhoneNo" value={phoneNo} onChange={(e)=> setPhoneNo(e.target.value)}/>
                <input className="email" placeholder="Email" type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" className="pswd" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <input className="secret" placeholder="Your secret" value={secret} onChange={(e)=> setSecret(e.target.value)}/>

                <button className="subBtn" type="submit">Sign Up</button>
                
            </form>
            <p className='errMsg'>{error}</p>
            </div>
        </div>
    )
    
}
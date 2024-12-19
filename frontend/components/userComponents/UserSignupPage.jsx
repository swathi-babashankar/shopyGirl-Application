import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount } from '../../features/user/userSignupSlice';
import './styles/signup.css';

export default function UserSignup(){
    
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const selector = useSelector(state => state.persistedReducer.userSignup.users)
    console.log(selector);

    const userSignUp = async () => {

        const data = {
            name,
            email,
            phoneNo,
            password
        }

        try {

            const response = await axios.post("http://localhost:4000/createUser", data, {withCredentials: true})
            console.log(response);
            dispatch(addAccount(response.data.userCreated))


        }

        catch(e){
            console.log(e);
            setError(e.response.data.message)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        userSignUp();

        setName("");
        setPhoneNo("");
        setEmail("");
        setPassword("");

    }

    return(
        <>
        <div className="main-div">
            <div className="form-div">
                <h2 className="hdng">Sign up</h2>

            <form className="signup" action="post" onSubmit={handleSubmit}>

                <input className="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input className="phoneNo" placeholder="PhoneNo" type="text" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                <input className="email" placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="pswd" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button className="subBtn" type="submit">Sign Up</button>
                
            </form>
            <p>{error}</p>
            </div>
        </div>
        </>
    )

}
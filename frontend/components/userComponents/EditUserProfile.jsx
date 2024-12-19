import "./styles/editProfile.css";
// maybe -call redux createUser grab the pre saved values display it in input
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../features/user/userSignupSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUserProfile(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [newPswd, setNewPswd] = useState("");
    const [confirmPaswd, setconfirmPaswd] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const dispatch = useDispatch();
    let {id} = useParams();
    id = id.slice(4);

    const navigate = useNavigate() ;


    const userId = useSelector(state =>state.persistedReducer.userAuthSlice.userData?._id);

    useEffect(() => {

        if(!userId) {
            navigate("/userLogin")
            
        }
    })
    

    const updateUserProfile = async () => {

        const data = {
            name,
            email,
            phoneNo,
            newPswd,
            confirmPswd: confirmPaswd,
            password: currPassword

        };

        

        try{
            const response = await axios.put(`http://localhost:4000/updateUser/?id=${id}`, data, {withCredentials: true});
            console.log(response);

            setSuccessMsg(response.data.message);
            dispatch(updateAccount(response.data.userUpdated));

            
        }

        catch(e) {
            
            console.log(e);
            setError(e.response.data.message);
        }

    }

    const handleUpdate = () => {
        updateUserProfile();

        setName("");
        setEmail("");
        setNewPswd("");
        setconfirmPaswd("");
        setPhoneNo("");
        setCurrPassword("")
    }
    


    return(

        <div className="main-div">

            <div className="editDiv">
             <label>Name  <input type="text" className="uname" value={name} onChange={(e) => setName(e.target.value)} /> </label>
             <label className="eLabel">Email  <input type="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} /> </label> 
             <label>Phone No <input type="text" className="phoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} /> </label>
             <label>New Password  <input type="password" className="newPswd" value={newPswd} onChange={(e) =>setNewPswd(e.target.value)} /> </label> 
             <label>Confirm Password  <input type="password" className="confirmPswd" value={confirmPaswd} onChange={(e) => setconfirmPaswd(e.target.value)} /> </label>     
             <label>Current Password  <input type="password" className="pswd" value={currPassword} onChange={(e) => setCurrPassword(e.target.value)} /> </label> 

                <button className="updateBtn" type="button" onClick={handleUpdate}>Update Profile</button>
            </div>
            <p>{error}</p>
            <p>{successMsg}</p>
        </div>
    )
}
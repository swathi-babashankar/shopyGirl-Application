import "./styles/editProfile.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAdminAcc } from "../../features/admin/adminSignupSlice";
import { useParams } from "react-router-dom";


export default function EditAdminProfile(){

    const [email, setEmail] = useState("");
    const [newPswd, setNewPswd] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState(""); 
    const [successMsg, setSuccessMsg] = useState("")

    let {id} = useParams();
    id = id.slice(4);

    const dispatch = useDispatch();

    const updateAccount = async () => {

        const data = {
            email,
            newPswd,
            confirmPaswd: confPassword,
            password: currPassword,
            phoneNo

        }

        try{

            const response = await axios.put(`http://localhost:4000/editAdmin/?id=${id}`, data, {withCredentials: true});

            setSuccessMsg(response.data.message);
            dispatch(updateAdminAcc(response.data.updatedDetails))


        }

        catch(e){
            console.log(e);
        }
    }

    const handleUpdate = () => {
        updateAccount();

        setEmail("");
        setNewPswd("");
        setConfPassword("");
        setCurrPassword("");

    }

    return(

        <div className="main-div">

          <h2 className="adEditHdng">Update Your Details Here</h2>

            <div className="editDiv">
              <label className="edEmail">Email <input type="email" placeholder="Enter Your Email" className="email" value={email} onChange={(e) => setEmail(e.target.value)}/> </label> 
              <label>New Password  <input type="password" placeholder="New Password" className="newPswd"  value={newPswd} onChange={(e) => setNewPswd(e.target.value)}/> </label> 
              <label>Confirm Password <input type="password" placeholder="Confirm Password" className="confirmPswd" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/> </label> 
              <label>Current Password  <input type="password" placeholder="Current Password" className="pswd" value={currPassword} onChange={(e) => setCurrPassword(e.target.value)} /> </label> 
              <label>PhoneNo <input type="text" placeholder="Your PhoneNo" className="adEphoneNo" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/> </label>  

              <button className="updateBtn" type="button" onClick={handleUpdate}>Update Profile</button>
            </div>
            <p>{successMsg}</p>
        </div>
    )
}
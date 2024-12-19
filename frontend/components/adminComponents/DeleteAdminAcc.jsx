import "./styles/deleteAccount.css";
import no from "../../assets/no.png";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteAdminAcc } from "../../features/admin/adminSignupSlice";

export default function DeleteAdminAccount() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const {id} = useParams();
    const dispatch = useDispatch();

    const deleteAccount = async () => {

        const data = {
            email,
            password
        }

        const response = await axios.delete(`http://localhost:4000/deleteAccount/?${id}`, { withCredentials: true }, data );

        setSuccessMsg(response.data.message);
        dispatch(deleteAdminAcc(response.data.deleteAccount._id));
        

    }

    const handleDelete = () => {
        deleteAccount();

        setEmail("");
        setPassword("");

    }

    return(
        <>

        <Link to={`/admin/viewAdminProfile/${id}`}>
        <img className="noImg" src={no} alt="" width={100} />
        </Link>

        <div className="delDiv">

            <h2 className="pageHdng">Account Deletion Page</h2>

            <div className="secDiv">
               <label>Email <input type="text" className="adMail" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
               <label>Password <input type="password" className="adPswd" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
               <button className="deleteAcc" onClick={handleDelete}>Delete Account</button>
            </div>

            <p>{ successMsg }</p>

        </div>

        </>
        
    )

}
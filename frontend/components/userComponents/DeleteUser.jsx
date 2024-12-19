import "./styles/deleteUser.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteAccount } from "../../features/user/userSignupSlice";
import no from "../../assets/no.png"

export default function DeleteUser() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState(null);

    let { id } = useParams();
    id = id.slice(4);
    
    const dispatch = useDispatch();

    const deleteUserAccount = async () => {

        const data = {
            email,
            password
        }

        try {

            const response = await axios.delete(`http://localhost:4000/deleteUser/?id=${id}`, { withCredentials: true }, data);
            console.log(response);
            setSuccessMsg(response.data.message);

            dispatch(deleteAccount(response.data.userDeleted._id));


        }

        catch(e) {

            console.log(e);
            setError(e.response.data.message);
        }
    }

    const handleDelete = () => {
        deleteUserAccount();
    }

    return(
        <>
        <Link to={`/user/viewUserProfile/:id=${id}`}>
        <img className="userNoImg" src={no} alt="" width={100} />
        </Link>
        <div className="userDelDiv">

          <h2 className="pageHdng">Account Deletion Page</h2>

          <div className="secDiv">
             <label>Email <input type="text" className="adMail" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
             <label>Password <input type="password" className="adPswd" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
             <button className="deleteAcc" onClick={handleDelete}>Delete Account</button>
          </div>

          <p>{ successMsg }</p>
          <p>{ error }</p>

        </div>
        </>
    )
}


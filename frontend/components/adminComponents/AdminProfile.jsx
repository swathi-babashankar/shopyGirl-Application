import "./styles/adminProfile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminProfile() {

    // const [adminInfo, setAdminInfo] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [error, setError] = useState(null);

    let {id} = useParams();
    id = id.slice(4)
    console.log(id.slice(3));

    const navigate = useNavigate();



    useEffect( () => {

        const getAdminInfo = async () => {

            try {

                const response = await axios.get(`http://localhost:4000/getAdminAccount/?adminId=${id}`, {withCredentials: true});
                // setAdminInfo(response.data.adminAccount);
                setName(response.data.adminAccount.name);
                setEmail(response.data.adminAccount.email);
                setPhoneNo(response.data.adminAccount.phoneNo);
                
                console.log(response);

            }

            catch(e) {

                console.log(e);
                setError(e.response.data.message);
            }

        };

        getAdminInfo();

    }, [id]);

    const handleDelete = () => {
        navigate(`/admin/deleteAdminAccount/:id=${id}`);

    }

    const handleUpdate = () => {
        navigate(`/admin/updateAdminAccount/:id=${id}`)
    }

    return(
        <div className="profDiv">
            <h2 className="profHdng">Personal Information</h2>
            <div className="inputDiv">
             <label>Name &nbsp;&nbsp;&nbsp;&nbsp;<input className="adName" value={name} type="text" readOnly /></label>  
             <label>Email &nbsp; &nbsp;<input className="adMail" type="email" value={email} readOnly /></label>
             <label>PhoneNo <input className="adPswd" type="text" value={phoneNo} readOnly /></label> 
             <button style={{color: "tomato"}} onClick={handleDelete}>Delete Account</button>
             <button style={{color: "teal"}} onClick={handleUpdate}>Update Details</button>

            </div>
            <p>{error}</p>

        </div>
    )

}
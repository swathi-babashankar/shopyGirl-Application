import "./styles/userProfile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



export default function UserProfile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    let { id } = useParams();
    id = id.slice(4);
    const navigate = useNavigate();

    useEffect( () => {

        
        const getUserInfo = async () => {

            try {

                const response = await axios.get(`http://localhost:4000/getUserAccount/?userId=${id}`, {withCredentials: true});
                console.log(response);

                setName(response.data.userAccount.name)
                setEmail(response.data.userAccount.email)
                setPhoneNo(response.data.userAccount.phoneNo)
                
            }

            catch(e) {
                console.log(e);
            }
        };

        getUserInfo();

    }, [id] );

    const handleUpdate = () => {
        navigate(`/user/updateUserDetails/:id=${id}`)
    }

    const handleDelete = () => {
        navigate(`/user/deleteUserAccount/:id=${id}`)

    }


    return (

        <div className="profileDiv">

            <h2 className="profHdng">Personal Information</h2>

            <div className="infoDiv">

            <label className="labelName"> Name &nbsp;&nbsp;&nbsp;&nbsp;<input className="adName" value={name} type="text" readOnly /></label>  
             <label> &nbsp;Email <input className="adMail" type="email" value={email} readOnly /></label>
             <label className="phLabel">PhoneNo <input className="adPswd" type="text" value={phoneNo} readOnly /></label> 
             <button style={{color: "teal"}} onClick={handleUpdate}>Update Details</button>
             <button style={{color: "tomato"}} onClick={handleDelete}>Delete Account</button>

            </div>

        </div>
    )
}
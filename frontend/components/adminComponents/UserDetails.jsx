import { useRef } from "react";
import "./styles/userDetails.css"; 

export default function UserDetails({name, phoneNo, address}) {

    

    return(
        <div id="uMainDiv" >

          <form className="userDetls" method="dialog" >

            <p>Name - {name}</p>
            <p>PhoneNo - {phoneNo}</p>
            <p>Address - {address}</p>


          </form>

        </div>
    )

}
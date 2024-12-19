import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminAuth({children, route=""}){
    
    // const [status, setStatus] = useState(false)
    const selector = useSelector(state => state.persistedReducer.adminAuthSlice.status);
    console.log("auth", selector);

    const navigate = useNavigate();

    
    useEffect( () => {

        if(selector === true){
        navigate(route)
        }

        else
        navigate("/adminLogin/secretroute111")

    }, [route, selector, navigate])

    return(
        <div>
        {children}
        </div>
    )

    
}
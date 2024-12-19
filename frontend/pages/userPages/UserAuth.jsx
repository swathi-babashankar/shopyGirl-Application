import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAuth({children, route}) {

    const selector = useSelector(state => state.persistedReducer.userAuthSlice.status);
    const navigate = useNavigate();

    let cookievalue = document.cookie.match("token")

    useEffect( () => {

        if(cookievalue !== null || cookievalue){
            navigate(route)
        }

        else
            navigate("/userLogin")
        
    }, [route, selector, navigate])

    return(
        <>
        {children}
        </>
    )
}
import { useEffect, useRef, useState } from "react";
import "./styles/order.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { login } from "../../features/user/userAuthSlice";
import { placeOrder } from "../../features/order/orderSlice";
import axios from "axios";
import OrderInfo from "./OrderInfo";
import ProductPreview from "../productComponent/ProductPreview";
import TotalAmtDetails from "./TotalAmtDetails";
import CartPage from "../../pages/CartPage";


export default function Order() {

  const userId = useSelector(state => state.persistedReducer.userAuthSlice.userData?._id);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [savedAddress, setSavedAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [orderingProduct, setOrderingProduct] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  // let [discPrice, setDiscPrice] = useState()

  let {id} = useParams();

  id = id?.slice(4);

  const ref = useRef();

  const loginUser = async () => {

    const data = {
      email,
      password
    }

    try {

      const response = await axios.post("http://localhost:4000/userLogin", data, {withCredentials: true});
      console.log(response);

      dispatch(login(response.data.userLoggedin))
    }

    catch(e) {

      console.log(e);
      setError(e.response.data.message);
    }

  }

  // api get to know whether the address is already saved if saved show address otherwise info inputs

  useEffect( () => {

    const getPreSavedInfo = async () => {

      if(showDetails) {
        ref.current?.showModal();
      }
      else{
        ref.current?.close()
      }

      try {

        if(userId) {
  
        const response = await axios.get(`http://localhost:4000/getAllOrders/?userId=${userId}`, { withCredentials: true });
        console.log("getOrders", response);
        setSavedAddress(response.data.allOrders[0]);
        }
        
      }
  
      catch(e) {

        console.log(e);
      }
    }

    getPreSavedInfo();

    // For Product Preview
   
    const getProductDetails = async () => {

      
      try {

        if(id){
          console.log("try");

          const response = await axios.get(`http://localhost:4000/getProductById/?prodId=${id}`);
          console.log(response);
          setOrderingProduct(response?.data.getProdById);
          
      }
    }

      catch(e) {
          console.log(e);
          // setError(e.response.data.message)
      }
  
}

  getProductDetails();

  // 

  

  }, []);


  const placeOrders = async () => {

    const data = {
      name,
      address,
      phoneNo,
      couponCode
    }

    console.log("try worlinh");

    try {

      if(id) {
        console.log("productid", id);

        const response = await axios.post(`http://localhost:4000/orderSingleProduct/?prodId=${id}&userId=${userId}`, data, { withCredentials: true } );
        console.log(response);
  
        setSuccessMsg(response.data.message);
      }

      else {

        const response = await axios.post(`http://localhost:4000/placeOrder/?userId=${userId}`, data, {withCredentials: true});
        console.log("orderCartprof",response);

        // dispatch( placeOrder(response.data.findingProduct))

        // localStorage.setItem("productOrdered", JSON.stringify(response.data.findingProduct))
         
        console.log(response.data.findingProduct);
        // ;
        setSuccessMsg(response.data);
      }
      
    }

    catch(e) {
      
      console.log(e);

    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();

    setEmail("");
    setPassword("");

  }

  // const handleApply = async () => {
  //   setCouponCode("");

  //   // const code = {
  //   //   couponCode: couponCode
  //   // }

  //   try {

  //     const coupApply = await axios.get(`http://localhost:4000/applyCoupon/?prodId=${id}&couponCode=${couponCode}`);
  //     console.log(coupApply.data.price);
  //     setDiscPrice(coupApply.data.price);
  //     console.log(couponCode);
  //   }

  //   catch(e) {
  //     console.log(e);
  //   }



  // }

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    placeOrders();

    setName("");
    setAddress("");
    setPhoneNo("");
    setCouponCode("");

  }

    return(
        <>
        <div className="orderDiv">
          { userId? ( savedAddress ? ( <OrderInfo  { ...savedAddress } /> ) : ( <div className="formDiv">
          <button className="orderHdng" onClick={() => setShowDetails(true)}>Delivery Details</button>
          {showDetails&& <form className="orderForm" action="post" onSubmit={handleOrderSubmit}>
          <dialog  id="addressBox" ref={ref} ><button className="closeBtn" onClick={() => setShowDetails(false)}>×</button>
                <input type="text" className="orderName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" className="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                <input type="text" className="ph" placeholder="Phone No" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                <input type="text" className="cCode" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
                
                {/* <button className="order" type="submit" >Order</button> */}
                {/* <div className="order-btn"><button className="order" type="submit">Order</button></div> */}
                </dialog>
            </form>}
            
          </div> ) ) : ( <div className="logDiv">
             <h2 className="hdng">Login</h2>
     
             <form className="orderLogForm" action="post" onSubmit={handleSubmit}>

                <input className="orderMail" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="orderPswd" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <button className="orderSubBtn" type="submit">Login</button>
                
             </form>
             <h4 className="noAcnt">Dont have an account ? <Link to='/userSignup'><span className='span'>SignUp </span>  </Link> </h4>
             <p>{error}</p>
             </div>)}

          
            
          {/* <div className="formDiv">
          <h2 className="orderHdng">Delivery Details</h2>
            <form className="orderForm" action="post" onSubmit={handleOrderSubmit} >
                <input type="text" className="name" placeholder="Name" value={name}/>
                <input type="text" className="address" placeholder="Address" value={address}/>
                <input type="text" className="ph" placeholder="Phone No" value={phoneNo}/>
                <input type="text" className="cCode" placeholder="Coupon Code" value={couponCode}/>
              
                <button className="order" type="submit">Order</button>
            </form>
          </div> */}
          {/* <div className="box">

          </div> */}
          <div className="prodToOrder">
              
            { (orderingProduct.length!== 0)? <ProductPreview {...orderingProduct} />

             : <div className="pageCart">
             {userId && <CartPage />}
              </div>
            }
              
          </div>
          
          <div className="amtDetls">
          <TotalAmtDetails {...orderingProduct}/>
          </div>

          <div className="order-btn"><button className="order" type="submit" onClick={handleOrderSubmit}>Order</button></div>
        </div>
        {successMsg &&<h5 style={{color: "green"}}>Product Ordered Successfully !</h5>}
        </>
    )
}
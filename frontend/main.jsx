import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import {store, persistor} from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react'

// import ProductShow from './components/productComponent/ProductsShow.jsx';
import ProductShowPage from './pages/ProductsShowPage.jsx'
import UserLogin from './components/userComponents/UserLoginPage.jsx';
import UserSignup from './components/userComponents/UserSignupPage.jsx';
import AdminLogin from "./components/adminComponents/AdminLogin.jsx";
import AdminSignup from "./components/adminComponents/AdminSignup.jsx";
import AdminHome from "./components/adminComponents/AdminHome.jsx";
import AddProducts from "./components/adminComponents/AddProducts.jsx";
import AllProductsPage from './pages/adminControlPages/AllProductsPage.jsx'
import AdminAuth from './components/adminComponents/AdminAuth.jsx';
import CouponCreation from "./components/adminComponents/CouponCreation.jsx";
import AllCouponsPage from "./pages/adminControlPages/AllCouponsPage.jsx";
import EditProduct from "./components/adminComponents/EditProduct.jsx";
import EditCoupon from './components/adminComponents/EditCoupon.jsx';
import AdminProfile from './components/adminComponents/AdminProfile.jsx';
import DeleteAdminAccount from './components/adminComponents/DeleteAdminAcc.jsx';
import EditAdminProfile from './components/adminComponents/EditAdminProfile.jsx';
import UserAuth from './pages/userPages/UserAuth.jsx';
import ProductDetails from './components/productComponent/ProductDetails.jsx';
import CartPage from './pages/CartPage.jsx'
import UserProfile from './components/userComponents/UserProfile.jsx'
import EditUserProfile from './components/userComponents/EditUserProfile.jsx'
import DeleteUser from './components/userComponents/DeleteUser.jsx'
import Header from './components/header/Header.jsx'
import Order from './components/orderComponent/Order.jsx'
import OrderPage from './pages/OrderPage.jsx'
import CouponsPage from './pages/CouponsPage.jsx'
import AllOrders from './components/adminComponents/AllOrders.jsx'

const router = createBrowserRouter([{

  path: "/",
  element: <App/>,
   children: [
    {
     path: '/',
     element: <ProductShowPage/>

    },
    {
     path: "/productDetails/:id",
     element: <ProductDetails/>
    },
    {
      path: "/search/:name/:brand/:id",
      element: <ProductDetails/>


    },
    {
     path: '/userLogin',
     element: <UserLogin/>

   },
   {
    path: '/userSignup',
    element: <UserSignup/>
   },
   {
    path: '/user/viewUserProfile/:id',
    element: <UserProfile/>
   },
   {
    path: '/user/updateUserDetails/:id',
    element: <EditUserProfile/>
   },
   {
    path: '/user/deleteUserAccount/:id',
    element: <DeleteUser/>
   },
   {
    element: <Header/>
   },

   {
    path: "/coupons/viewAllCoupons",
    element: <CouponsPage/>
   },


   {
    path: "/user/:id/viewCart",
    element: (
    <UserAuth> 
      <CartPage/>
    </UserAuth>
    )
   },
   {
    path: "/user/order/:id",
    element: <Order/>
   },
   {
    path: "/user/order",
    element: <Order/>
   },
   {
    path: "/user/viewOrders",
    element: <OrderPage/>
   }
 ]
}, 

{
  path: "/adminLogin/secretroute111",
  element: <AdminLogin/>,
},
{
    path: "/adminSignup/secretroute121",
    element: <AdminSignup/>
  },
  {
    path: "/admin/viewAdminProfile/:id",
    element: <AdminProfile/>
  },
  {
    path: "/admin/adminHome",
    element: (
      <AdminAuth route="/admin/adminHome">
        <AdminHome/>
      </AdminAuth> 
    )
  }, 
  {
    path: "/admin/deleteAdminAccount/:id",
    element: (
      <AdminAuth >
        <DeleteAdminAccount/>
      </AdminAuth>
    )
  },
  {
    path: "/admin/updateAdminAccount/:id",
    element: (
      <AdminAuth>
        <EditAdminProfile/>
      </AdminAuth>
    )
  },
  {
    path: "/admin/addProducts",
    // insert AdminAuth
    element: (
      <AdminAuth route="/admin/addProducts">
        <AddProducts/> 
      </AdminAuth>  
    )
  }, 
  {
    path: "/admin/allOrders",
    element: (
      <AdminAuth route="/admin/allOrders">
        <AllOrders/>
      </AdminAuth>
    )
  },
  {
    path: "/admin/allProducts",
    // insert AdminAuth
    element: (
      <AdminAuth route="/admin/allProducts">
        <AllProductsPage/>
      </AdminAuth>
      )   
  },
  {
    path: "/admin/createCoupon",
    element: (
      <AdminAuth route="/admin/createCoupon">
        <CouponCreation/>
      </AdminAuth>
    )
  },
  {
    path: "/admin/allCoupons",
    element: (
      <AdminAuth route='/admin/allCoupons'>
        <AllCouponsPage/>
      </AdminAuth>
    )
  },
  {
    path: "admin/editCoupon/:couponId?",
    element: (   
        <EditCoupon/>
    )
  },
  {
    path: "/admin/editProduct/:prodId?",
    element: (
      <EditProduct/>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

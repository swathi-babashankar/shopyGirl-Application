
import './App.css'
import Header from './components/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';

function App() {
  return(
    <>
    {/* May be header with login button and cart which navigates to login or cart on click or show cart button only if loggedin or redirect 
    from cart to login if not loggedin */}
    {/* This may have productPage as home  */}
    {/* wrap redux store provider in main.jsx outside<provider store={store}> routerProvider </provider> */}
    <Header/>
    <Outlet/>
    <Footer/>
    {/* <ProductShow/> */}
    </>
  )
}

export default App;

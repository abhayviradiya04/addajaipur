import { Routes,Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import SlideBar from "../Pages/SlideBar/SlideBar";
import Cart from "../Pages/Cart/Cart";
import CheckOut from "../Pages/CheckOut/Checkout";
import Compare from "../Pages/Compare/Compare";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Login_Register from "../Pages/Login-Register/Login_Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Error from "../Pages/Error/Error";
import Blog from "../Pages/Blog/Blog";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Singleitem from "../Pages/SingleItem/Singleitem";



const Routers = () => {
    return (
        <>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/Shop" element={<SlideBar/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/compare" element={<Compare/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/login-register" element={<Login_Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/error" element={<Error/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/singleitem" element={<Singleitem/>} />
        </Routes>
        </>   
         )
}

export default Routers;
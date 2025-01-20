import { Routes,Route, Navigate } from "react-router-dom";

import Home from "../Pages/Home";
import SlideBar from "../Pages/SlideBar";



const Routers = () => {
    return (
        <>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/Shop" element={<SlideBar/>} />
           
            
        </Routes>
        </>   
         )
}

export default Routers;
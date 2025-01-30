
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout/Layout';
import React, { useEffect } from "react";
import Home from './Pages/Home/Home';
import SlideBar from './Pages/SlideBar/SlideBar';
import Cart from './Pages/Cart/Cart';
import Compare from './Pages/Compare/Compare';
import Wishlist from './Pages/Wishlist/Wishlist';
import Login_Register from './Pages/Login-Register/Login_Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Aboutus from './Pages/AboutUs/Aboutus';
import ContactUs from './Pages/ContactUs/ContactUs';
import Singleitem from './Pages/SingleItem/Singleitem';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import Checkout from './Pages/CheckOut/Checkout';
import Error from './Pages/Error/Error';



function App() {
  // useEffect(() => {
  //   const resources = {
  //       styles: [
  //         "assets/css/vendor/bootstrap.min.css",
  //         "assets/css/vendor/font-awesome.css",
  //         "assets/css/plugins.css",
  //         "assets/css/style.css",
  //         "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
  //         "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css",
  //       ],
  //       scripts: [
  //         "assets/js/vendor/jquery-3.3.1.min.js",
  //         "assets/js/vendor/jquery-migrate-1.4.1.min.js",
  //         "assets/js/vendor/popper.min.js",
  //         "assets/js/vendor/bootstrap.min.js",
  //         "assets/js/plugins.js",
  //         "assets/js/active.js",
  //         "https://code.jquery.com/jquery-3.6.0.min.js",
  //         "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
  //       ],
  //     };
    
  //     // Function to reload links and scripts dynamically
  //     function loadResources() {
  //       // Remove existing links and scripts if necessary
  //       document.querySelectorAll("link[rel='stylesheet']").forEach((link) => link.remove());
  //       document.querySelectorAll("script").forEach((script) => {
  //         if (script.src) script.remove();
  //       });
    
  //       // Add CSS files
  //       resources.styles.forEach((href) => {
  //         const link = document.createElement("link");
  //         link.rel = "stylesheet";
  //         link.href = href;
  //         link.onload = () => console.log(`Stylesheet loaded: ${href}`);
  //         link.onerror = () => console.error(`Failed to load stylesheet: ${href}`);
  //         document.head.appendChild(link);
  //       });
    
  //       // Add JS files
  //       resources.scripts.forEach((src) => {
  //         const script = document.createElement("script");
  //         script.src = src;
  //         script.onload = () => console.log(`Script loaded: ${src}`);
  //         script.onerror = () => console.error(`Failed to load script: ${src}`);
  //         document.body.appendChild(script);
  //       });
  //     }
    
  //     // Call this function when navigating to the home page
  //     function onHomePageRoute() {
  //       loadResources(); // Reload resources for the home page
  //       console.log("Navigated to the home page and resources reloaded.");
  //     }
    
  //     // Example: Call this function manually (or integrate it with your routing logic)
  //     onHomePageRoute();
  //   // Ensure jQuery and Owl Carousel are available globally
  //   const $ = window.$;

  //   // Initialize Owl Carousel
  //   $("#banner-carousel").owlCarousel({
  //     loop: true,
  //     margin: 10,
  //     nav: true,
  //     items: 1,
  //     autoplay: true,
  //     autoplayTimeout: 3000, // 3 seconds delay
  //     autoplayHoverPause: true,
  //   });

  //   // Cleanup to destroy the carousel instance on unmount
  //   return () => {
  //     $("#banner-carousel").trigger("destroy.owl.carousel");
  //   };
  // }, []);
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>  
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/Shop" element={<SlideBar/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/compare" element={<Compare/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/login-register" element={<Login_Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/error" element={<Error/>} />
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/singleitem" element={<Singleitem/>} /> 
          <Route path="/admin" element={<AdminPanel/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/header/Header';
import Home from './pages/home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Register from './pages/Register/register';
import Login from './pages/Login/Login';
import Wishlist from './pages/Wishlist/wishlist';
import Cart from './pages/Cart/Cart';
import ProductType from './pages/ProductType/ProductType';
import Checkout from './pages/Checkout/Checkout';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import AdminPanel from './pages/AdminPanel/AdminPanel'
import Profile from'./pages/Profile/Profile'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile/>} />
          {/* Product Details Route */}
          <Route path="/:type/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:type" element={<ProductType />} />
          {/* Razorpay Checkout Route */}
          <Route path="/checkout" element={<Checkout />} />
          {/* 404 Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

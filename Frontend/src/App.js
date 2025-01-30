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
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="/contact" element={<div>Contact Us Page</div>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          {/* Product Details Route */}
          <Route path="/:type/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:type" element={<ProductType />} />
          {/* Razorpay Checkout Route */}
          <Route path="/checkout" element={<Checkout />} />
          {/* 404 Route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

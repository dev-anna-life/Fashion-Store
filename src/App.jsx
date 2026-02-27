import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import WishList from './pages/WishList';  
import { WishListProvider } from './context/WishListContext';

function App() {
  return (
    <CartProvider> 
      <WishListProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<WishList />} />
          </Routes>
        </div>
      </Router>
      </WishListProvider>
    </CartProvider>
  );
}

export default App;
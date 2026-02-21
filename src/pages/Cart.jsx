import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Subtotal:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center mb-6 text-gray-600">
            <span>Shipping:</span>
            <span>Calculated at checkout</span>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition text-center block text-lg font-medium"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="w-full text-center block mt-4 text-blue-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-lg shadow">
      {/* Image and Product Info */}
      <div className="flex items-start gap-4 flex-1">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity Controls and Price - Mobile Layout */}
      <div className="flex items-center justify-between sm:justify-end gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-lg font-medium"
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-lg font-medium"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <p className="text-lg font-bold text-gray-900 min-w-[80px] text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        {/* Delete Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 flex-shrink-0"
          aria-label="Remove item"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
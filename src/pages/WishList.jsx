import { Link } from 'react-router-dom';
import { useWishList } from '../context/WishListContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const WishList = () => {
  const { WishListItems = [], removeFromWishList } = useWishList();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Added to cart!', { icon: '🛒', duration: 2000 });
  };

  if (WishListItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Save items you love so you don't lose them!
          </p>
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
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Wishlist ({WishListItems.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {WishListItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative"
            >
              <button
                onClick={() => removeFromWishList(product.id)}
                className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition"
              >
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} />
                </svg>
              </button>

              <Link to={`/product/${product.id}`}>
                <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>

                  <p className="text-lg font-bold text-gray-900 mb-3">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>

              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>

        <div className="flex items-center mt-2">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-600">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
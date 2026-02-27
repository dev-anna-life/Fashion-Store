import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../data/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!', {
      duration: 2000,
      icon: '🛒'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          to="/"
          className="text-blue-600 hover:underline mb-8 inline-block"
        >
          ← Back to shop
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="ml-2 text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              <p className="text-4xl font-bold text-blue-600 mb-6">
                ${product.price.toFixed(2)}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 capitalize">
                  {product.category}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
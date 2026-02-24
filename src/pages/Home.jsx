import { useState, useEffect } from 'react';
import { fetchProducts } from '../data/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const categories = [
    'all',
    'premium',
    ...new Set(products.map((product) => product.category).filter(cat => cat !== 'premium')),
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products.filter((product) => product.category !== 'premium')
      : selectedCategory === 'premium'
      ? products.filter((product) => product.category === 'premium')
      : products.filter((product) => product.category === selectedCategory);

  const premiumProducts = products.filter((product) => product.category === 'premium');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Fashion Store</h1>
          <p className="text-xl">Discover the latest trends in fashion</p>
        </div>
      </div>

      {premiumProducts.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                EXCLUSIVE
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Premium Collection</h2>
              <p className="text-gray-600 text-lg">Luxury items handpicked for you</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {premiumProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 right-2 z-10 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setSelectedCategory('premium')}
                className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition font-semibold text-lg"
              >
                View All Premium Products →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium capitalize transition ${
                selectedCategory === category
                  ? category === 'premium'
                    ? 'bg-amber-600 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'premium' && '⭐ '}
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
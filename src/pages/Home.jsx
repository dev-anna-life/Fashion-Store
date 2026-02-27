import { useState, useEffect } from 'react';
import { fetchProducts } from '../data/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')

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

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all'
        ? product.category !== 'premium'
        : selectedCategory === 'premium'
          ? product.category === 'premium'
          : product.category === selectedCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating.rate - a.rating.rate)
  }

  const premiumProducts = products.filter((product) => product.category === 'premium');

if (loading) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Fashion Store</h1>
          <p className="text-xl mb-8">Discover the latest trends in fashion</p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                disabled
                className="w-full px-6 py-4 rounded-full text-gray-900 text-lg bg-white/90"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Fashion Store</h1>
          <p className="text-xl mb-4">Discover the latest trends in fashion</p>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <svg
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

            </div>
          </div>
        </div>
      </div>

      {premiumProducts.length > 0 && !searchQuery && (
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
              className={`px-6 py-2 rounded-full font-medium capitalize transition ${selectedCategory === category
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

        {searchQuery && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Found <span className="font-bold text-gray-900">{filteredProducts.length}</span> results for "{searchQuery}"
            </p>
          </div>
        )}

        <div className="flex justify-end mb-6">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: Hight to Low</option>
              <option value="rating">Highest Rated</option>
          </select>
          </div>

       {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) =>
          <ProductCard key={product.id} product={product} />
          )}
        </div>
  ): (
     <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products found matching your search.</p>
          </div> 
       )}
       </div>
       </div>
       );
      }

export default Home;
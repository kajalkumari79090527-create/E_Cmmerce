import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontalIcon, 
  XIcon, 
  SearchIcon,
  ChevronDownIcon 
} from 'lucide-react';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: 'all',
    sort: 'featured',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...products];
    
    // Search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }
    
    // Sorting
    switch (filters.sort) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured - keep as is
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, filters]);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹5000', value: '1000-5000' },
    { label: 'Above ₹5000', value: '5000-' },
  ];

  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Name', value: 'name' },
  ];

  return (
    <div className="min-h-screen bg-secondary-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
              Products
            </span>
          </h1>
          <p className="text-xl text-secondary-600">
            Discover amazing products at great prices
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-primary-500 focus:outline-none transition-all shadow-lg"
            />
          </div>

          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center justify-center space-x-2 bg-white px-6 py-4 rounded-2xl shadow-lg font-semibold"
          >
            <SlidersHorizontalIcon className="w-5 h-5" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown (Desktop) */}
          <div className="hidden lg:block relative group">
            <button className="flex items-center space-x-2 bg-white px-6 py-4 rounded-2xl shadow-lg font-semibold">
              <span>Sort by: {sortOptions.find(opt => opt.value === filters.sort)?.label}</span>
              <ChevronDownIcon className="w-5 h-5" />
            </button>
            
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters({ ...filters, sort: option.value })}
                  className={`w-full text-left px-4 py-3 hover:bg-secondary-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
                    filters.sort === option.value ? 'bg-primary-50 text-primary-600' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2 mb-6">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-4 h-4 text-primary-500"
                    />
                    <span className="text-secondary-700 capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </label>
                ))}
              </div>

              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                      className="w-4 h-4 text-primary-500"
                    />
                    <span className="text-secondary-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
                    <div className="aspect-square bg-secondary-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-secondary-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-secondary-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-secondary-200 rounded w-full mb-4"></div>
                      <div className="h-4 bg-secondary-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-secondary-800 mb-2">No products found</h3>
                <p className="text-secondary-600">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <p className="text-secondary-600 mb-4">
                  Showing {filteredProducts.length} products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-secondary-100 rounded-full transition-colors"
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Filters Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Sort By</h3>
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="mobileSort"
                            value={option.value}
                            checked={filters.sort === option.value}
                            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            className="w-4 h-4 text-primary-500"
                          />
                          <span className="text-secondary-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="mobileCategory"
                            value={category}
                            checked={filters.category === category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-4 h-4 text-primary-500"
                          />
                          <span className="text-secondary-700 capitalize">
                            {category === 'all' ? 'All Categories' : category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="mobilePriceRange"
                            value={range.value}
                            checked={filters.priceRange === range.value}
                            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                            className="w-4 h-4 text-primary-500"
                          />
                          <span className="text-secondary-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
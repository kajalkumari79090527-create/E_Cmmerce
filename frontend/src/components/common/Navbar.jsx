import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  LogOutIcon, 
  MenuIcon, 
  XIcon,
  HeartIcon,
  SearchIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-15 bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-500"></div>
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-primary-100 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                    location.pathname === link.path
                      ? 'text-primary-600'
                      : 'text-amber-100 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    location.pathname === link.path ? 'scale-x-100' : ''
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-secondary-600 hover:text-primary-600 transition-colors relative group"
              >
                <SearchIcon className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full group-hover:animate-ping"></span>
              </button>

              {/* Wishlist */}
              <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors hidden md:block">
                <HeartIcon className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-secondary-600 hover:text-primary-600 transition-colors group">
                <ShoppingBagIcon className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {items.length}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                    <UserIcon className="w-5 h-5" />
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-2">
                    <div className="p-4 border-b border-secondary-100">
                      <p className="font-semibold text-secondary-800">{user?.name}</p>
                      <p className="text-sm text-secondary-500">{user?.email}</p>
                    </div>
                    <div className="p-2 text-3xl">
                      <Link to="/profile" className="block px-4 py-2 text-secondary-600 hover:bg-secondary-50 rounded-xl transition-colors">
                        Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-secondary-600 hover:bg-secondary-50 rounded-xl transition-colors">
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-danger-600 hover:bg-danger-50 rounded-xl transition-colors flex items-center space-x-2"
                      >
                        <LogOutIcon className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-secondary-600 hover:text-primary-600 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full hover:shadow-lg hover:shadow-primary-500/30 transition-all hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-secondary-600 hover:text-primary-600 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/90 backdrop-blur-xl border-t border-secondary-100"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl transition-all ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-center border-2 border-primary-500 text-primary-600 rounded-xl font-medium hover:bg-primary-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="bg-white p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for products, brands, and more..."
                    className="w-full pl-12 pr-4 py-4 bg-secondary-50 border-2 border-transparent rounded-2xl focus:border-primary-500 focus:bg-white transition-all outline-none text-lg"
                    autoFocus
                  />
                </div>
                <div className="mt-8">
                  <p className="text-sm text-secondary-500 mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books'].map((term) => (
                      <button
                        key={term}
                        className="px-4 py-2 bg-secondary-100 rounded-full text-secondary-600 hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
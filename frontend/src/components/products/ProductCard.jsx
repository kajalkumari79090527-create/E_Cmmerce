import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { HeartIcon, ShoppingBagIcon, EyeIcon, StarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart', {
        icon: '🔐',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }
    dispatch(addToCart(product.id));
    toast.success('Added to cart!', {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#4ade80',
        color: '#fff',
      },
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: isLiked ? '💔' : '❤️',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          -{product.discount}% OFF
        </div>
      )}

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-white text-secondary-800 p-4 rounded-full hover:bg-primary-500 hover:text-white transition-colors shadow-xl"
          >
            <ShoppingBagIcon className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-4 rounded-full transition-colors shadow-xl ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-secondary-800 hover:bg-red-500 hover:text-white'
            }`}
          >
            <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          
          <Link to={`/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-secondary-800 p-4 rounded-full hover:bg-primary-500 hover:text-white transition-colors shadow-xl"
            >
              <EyeIcon className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="text-sm text-primary-500 font-semibold mb-2 uppercase tracking-wider">
          {product.category}
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-secondary-800 mb-2 hover:text-primary-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-4 h-4 ${
                  star <= 4
                    ? 'text-yellow-400 fill-current'
                    : 'text-secondary-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-secondary-500 ml-2">(124 reviews)</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-secondary-900">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-secondary-400 line-through ml-2">
                ₹{product.oldPrice}
              </span>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all"
          >
            <ShoppingBagIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 origin-left"
      />
    </motion.div>
  );
};

export default ProductCard;
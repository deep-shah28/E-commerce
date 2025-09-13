import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

const Header: React.FC = () => {
  const {
    cart,
    categories,
    toggleCart,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useStore();

  const cartItemsCount = cart?.total_items || 0;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl lg:text-3xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
            onClick={closeMobileMenu}
          >
            Luxe Store
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Products
            </Link>
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 capitalize"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200">
              <User size={20} />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <nav className="py-4 space-y-2">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200"
                >
                  Products
                </Link>
                {categories.slice(0, 3).map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200 capitalize"
                  >
                    {category.name}
                  </Link>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                    <Search size={16} className="mr-3" />
                    Search
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-200">
                    <User size={16} className="mr-3" />
                    Account
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

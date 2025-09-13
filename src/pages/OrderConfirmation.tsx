import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const { orderNumber, total } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            
            {orderNumber && (
              <div className="bg-white rounded-lg p-6 shadow-lg inline-block">
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="text-2xl font-bold text-primary-600">{orderNumber}</p>
                {total && (
                  <p className="text-lg text-gray-700 mt-2">Total: {total}</p>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Mail size={32} className="text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Confirmation</h3>
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Package size={32} className="text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Processing</h3>
              <p className="text-sm text-gray-600">
                Your order is being prepared and will be processed within 1-2 business days.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Truck size={32} className="text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Shipping</h3>
              <p className="text-sm text-gray-600">
                Free shipping! Your order will arrive within 3-5 business days.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-gray-600">
              You can track your order status and view your purchase history in your account.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight size={16} />
              </Link>
              
              <Link
                to="/"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12 p-6 bg-primary-50 rounded-lg"
          >
            <h3 className="font-semibold text-primary-700 mb-2">Need Help?</h3>
            <p className="text-primary-600 text-sm mb-4">
              If you have any questions about your order, don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
              <span className="text-primary-600">📧 support@luxestore.com</span>
              <span className="text-primary-600">📞 +1 (555) 123-4567</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

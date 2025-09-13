import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LoadingSpinner } from '../components';
import toast from 'react-hot-toast';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, emptyCart } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  useEffect(() => {
    if (!cart || cart.line_items.length === 0) {
      navigate('/products');
      toast.error('Your cart is empty');
    }
  }, [cart, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(form.email && form.firstName && form.lastName);
      case 2:
        return !!(form.address && form.city && form.state && form.zipCode && form.country);
      case 3:
        return !!(form.cardNumber && form.expiryDate && form.cvv && form.cardName);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processOrder = async () => {
    if (!validateStep(3)) {
      toast.error('Please complete all fields');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await emptyCart();
      toast.success('Order placed successfully!');
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: `ORD-${Date.now()}`,
          total: cart?.subtotal.formatted_with_symbol 
        } 
      });
    } catch (error) {
      console.error('Order processing failed:', error);
      toast.error('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Contact Info', completed: currentStep > 1 },
    { number: 2, title: 'Shipping', completed: currentStep > 2 },
    { number: 3, title: 'Payment', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-500 text-white' :
                      currentStep === step.number ? 'bg-primary-600 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {step.completed ? <Check size={16} /> : step.number}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${
                      currentStep === step.number ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`mx-4 w-12 h-0.5 ${
                        step.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Form Steps */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card p-6"
              >
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                    <input
                      type="text"
                      name="address"
                      placeholder="Street address"
                      value={form.address}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP code"
                        value={form.zipCode}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                      <select
                        name="country"
                        value={form.country}
                        onChange={handleInputChange}
                        className="input"
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-6">
                      <CreditCard size={20} className="text-primary-600" />
                      <h2 className="text-xl font-semibold">Payment Information</h2>
                      <Lock size={16} className="text-green-500" />
                    </div>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder name"
                      value={form.cardName}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={form.cardNumber}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={form.expiryDate}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={form.cvv}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-4">
                      <Lock size={16} className="mr-2" />
                      Your payment information is secure and encrypted
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {currentStep < 3 ? (
                    <button onClick={nextStep} className="btn-primary">
                      Next Step
                    </button>
                  ) : (
                    <button
                      onClick={processOrder}
                      disabled={isProcessing}
                      className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <LoadingSpinner size="sm" color="text-white" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Place Order</span>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {cart.line_items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm">{item.line_total.formatted_with_symbol}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{cart.subtotal.formatted_with_symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>{cart.subtotal.formatted_with_symbol}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

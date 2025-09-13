import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Commerce from '@chec/commerce.js';
import { Product, Cart, Category } from '../types';
import { mockProducts, mockCategories } from '../data/mockData';

// Initialize Commerce.js (you'll need to replace with your actual public key)
const commerce = new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY || 'pk_test_placeholder', true);

// Check if we have a valid Commerce.js key
const hasValidCommerceKey = import.meta.env.VITE_CHEC_PUBLIC_KEY && 
  import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'pk_test_placeholder' &&
  import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'your_commerce_js_public_key_here';

interface StoreState {
  // Products
  products: Product[];
  categories: Category[];
  isLoadingProducts: boolean;
  
  // Cart
  cart: Cart | null;
  isLoadingCart: boolean;
  
  // UI State
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  emptyCart: () => Promise<void>;
  
  // UI Actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        products: [],
        categories: [],
        isLoadingProducts: false,
        cart: null,
        isLoadingCart: false,
        isCartOpen: false,
        isMobileMenuOpen: false,

        // Fetch products
        fetchProducts: async () => {
          set({ isLoadingProducts: true });
          try {
            if (hasValidCommerceKey) {
              const { data } = await commerce.products.list();
              set({ products: data, isLoadingProducts: false });
            } else {
              // Use mock data when Commerce.js is not configured
              setTimeout(() => {
                set({ products: mockProducts, isLoadingProducts: false });
              }, 500); // Simulate loading time
            }
          } catch (error) {
            console.error('Error fetching products, using mock data:', error);
            set({ products: mockProducts, isLoadingProducts: false });
          }
        },

        // Fetch categories
        fetchCategories: async () => {
          try {
            if (hasValidCommerceKey) {
              const { data } = await commerce.categories.list();
              set({ categories: data });
            } else {
              // Use mock data when Commerce.js is not configured
              set({ categories: mockCategories });
            }
          } catch (error) {
            console.error('Error fetching categories, using mock data:', error);
            set({ categories: mockCategories });
          }
        },

        // Fetch cart
        fetchCart: async () => {
          set({ isLoadingCart: true });
          try {
            if (hasValidCommerceKey) {
              const cart = await commerce.cart.retrieve();
              set({ cart, isLoadingCart: false });
            } else {
              // Use empty mock cart when Commerce.js is not configured
              const mockCart: Cart = {
                id: 'mock_cart_1',
                created: Date.now(),
                updated: Date.now(),
                expires: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days from now
                total_items: 0,
                total_unique_items: 0,
                subtotal: {
                  raw: 0,
                  formatted: '0.00',
                  formatted_with_symbol: '$0.00',
                },
                line_items: [],
              };
              set({ cart: mockCart, isLoadingCart: false });
            }
          } catch (error) {
            console.error('Error fetching cart:', error);
            set({ isLoadingCart: false });
          }
        },

        // Add to cart
        addToCart: async (productId: string, quantity = 1) => {
          try {
            if (hasValidCommerceKey) {
              const { cart } = await commerce.cart.add(productId, quantity);
              set({ cart });
            } else {
              // Mock cart functionality
              const { cart, products } = get();
              if (!cart) return;
              
              const product = products.find(p => p.id === productId);
              if (!product) return;

              const existingItem = cart.line_items.find(item => item.product_id === productId);
              let updatedLineItems;

              if (existingItem) {
                updatedLineItems = cart.line_items.map(item =>
                  item.product_id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + quantity,
                        line_total: {
                          raw: (item.quantity + quantity) * product.price.raw,
                          formatted: ((item.quantity + quantity) * product.price.raw).toFixed(2),
                          formatted_with_symbol: `$${((item.quantity + quantity) * product.price.raw).toFixed(2)}`,
                        }
                      }
                    : item
                );
              } else {
                const newItem = {
                  id: `line_item_${Date.now()}`,
                  product_id: productId,
                  name: product.name,
                  quantity,
                  price: product.price,
                  line_total: {
                    raw: quantity * product.price.raw,
                    formatted: (quantity * product.price.raw).toFixed(2),
                    formatted_with_symbol: `$${(quantity * product.price.raw).toFixed(2)}`,
                  },
                  image: product.image,
                };
                updatedLineItems = [...cart.line_items, newItem];
              }

              const subtotalRaw = updatedLineItems.reduce((sum, item) => sum + item.line_total.raw, 0);
              const totalItems = updatedLineItems.reduce((sum, item) => sum + item.quantity, 0);

              const updatedCart = {
                ...cart,
                line_items: updatedLineItems,
                total_items: totalItems,
                total_unique_items: updatedLineItems.length,
                subtotal: {
                  raw: subtotalRaw,
                  formatted: subtotalRaw.toFixed(2),
                  formatted_with_symbol: `$${subtotalRaw.toFixed(2)}`,
                },
                updated: Date.now(),
              };

              set({ cart: updatedCart });
            }
            get().openCart();
          } catch (error) {
            console.error('Error adding to cart:', error);
          }
        },

        // Update cart item
        updateCartItem: async (itemId: string, quantity: number) => {
          try {
            if (hasValidCommerceKey) {
              const { cart } = await commerce.cart.update(itemId, { quantity });
              set({ cart });
            } else {
              // Mock cart functionality
              const { cart, products } = get();
              if (!cart) return;

              const cartItem = cart.line_items.find(item => item.id === itemId);
              if (!cartItem) return;

              const product = products.find(p => p.id === cartItem.product_id);
              if (!product) return;

              const updatedLineItems = cart.line_items.map(item =>
                item.id === itemId
                  ? {
                      ...item,
                      quantity,
                      line_total: {
                        raw: quantity * product.price.raw,
                        formatted: (quantity * product.price.raw).toFixed(2),
                        formatted_with_symbol: `$${(quantity * product.price.raw).toFixed(2)}`,
                      }
                    }
                  : item
              );

              const subtotalRaw = updatedLineItems.reduce((sum, item) => sum + item.line_total.raw, 0);
              const totalItems = updatedLineItems.reduce((sum, item) => sum + item.quantity, 0);

              const updatedCart = {
                ...cart,
                line_items: updatedLineItems,
                total_items: totalItems,
                subtotal: {
                  raw: subtotalRaw,
                  formatted: subtotalRaw.toFixed(2),
                  formatted_with_symbol: `$${subtotalRaw.toFixed(2)}`,
                },
                updated: Date.now(),
              };

              set({ cart: updatedCart });
            }
          } catch (error) {
            console.error('Error updating cart:', error);
          }
        },

        // Remove from cart
        removeFromCart: async (itemId: string) => {
          try {
            if (hasValidCommerceKey) {
              const { cart } = await commerce.cart.remove(itemId);
              set({ cart });
            } else {
              // Mock cart functionality
              const { cart } = get();
              if (!cart) return;

              const updatedLineItems = cart.line_items.filter(item => item.id !== itemId);
              const subtotalRaw = updatedLineItems.reduce((sum, item) => sum + item.line_total.raw, 0);
              const totalItems = updatedLineItems.reduce((sum, item) => sum + item.quantity, 0);

              const updatedCart = {
                ...cart,
                line_items: updatedLineItems,
                total_items: totalItems,
                total_unique_items: updatedLineItems.length,
                subtotal: {
                  raw: subtotalRaw,
                  formatted: subtotalRaw.toFixed(2),
                  formatted_with_symbol: `$${subtotalRaw.toFixed(2)}`,
                },
                updated: Date.now(),
              };

              set({ cart: updatedCart });
            }
          } catch (error) {
            console.error('Error removing from cart:', error);
          }
        },

        // Empty cart
        emptyCart: async () => {
          try {
            if (hasValidCommerceKey) {
              const { cart } = await commerce.cart.empty();
              set({ cart });
            } else {
              // Mock cart functionality
              const { cart } = get();
              if (!cart) return;

              const emptyCart = {
                ...cart,
                line_items: [],
                total_items: 0,
                total_unique_items: 0,
                subtotal: {
                  raw: 0,
                  formatted: '0.00',
                  formatted_with_symbol: '$0.00',
                },
                updated: Date.now(),
              };

              set({ cart: emptyCart });
            }
          } catch (error) {
            console.error('Error emptying cart:', error);
          }
        },

        // UI Actions
        toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
        openCart: () => set({ isCartOpen: true }),
        closeCart: () => set({ isCartOpen: false }),
        toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
        closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      }),
      {
        name: 'commerce-store',
        partialize: (state) => ({
          cart: state.cart,
        }),
      }
    ),
    {
      name: 'commerce-store',
    }
  )
);

// Commerce.js types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    formatted: string;
    formatted_with_symbol: string;
    raw: number;
  };
  image: {
    url: string;
  } | null;
  media: {
    source: string;
    type: string;
  };
  inventory: {
    managed: boolean;
    available: number;
  };
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  permalink: string;
  sku: string;
  sort_order: number;
  created: number;
  updated: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  quantity: number;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
  };
  line_total: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
  };
  image: {
    url: string;
  } | null;
}

export interface Cart {
  id: string;
  created: number;
  updated: number;
  expires: number;
  total_items: number;
  total_unique_items: number;
  subtotal: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
  };
  line_items: CartItem[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: number;
  created: number;
  updated: number;
}

// UI Types
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string, quantity?: number) => void;
  isLoading?: boolean;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CheckoutData {
  customer: {
    firstname: string;
    lastname: string;
    email: string;
  };
  shipping: {
    name: string;
    street: string;
    town_city: string;
    county_state: string;
    postal_zip_code: string;
    country: string;
  };
  fulfillment: {
    shipping_method: string;
  };
  payment: {
    gateway: string;
    stripe?: {
      payment_method_id: string;
    };
  };
}

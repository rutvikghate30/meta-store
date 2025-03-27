
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  rating: number;
  description: string;
  featured: boolean;
  stock: number;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  color?: string;
  size?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    category: 'lighting',
    price: 89.99,
    discountPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    description: 'A sleek, adjustable desk lamp with integrated wireless charging for your devices. The perfect blend of functionality and minimalist design.',
    featured: true,
    stock: 15,
    colors: ['black', 'white', 'silver'],
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    category: 'furniture',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    description: 'Premium ergonomic chair with adjustable lumbar support and breathable mesh fabric. Designed for ultimate comfort during long work sessions.',
    featured: true,
    stock: 8,
    colors: ['black', 'gray'],
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    category: 'audio',
    price: 129.99,
    discountPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    description: 'True wireless earbuds with active noise cancellation and premium sound quality. Includes wireless charging case with 24-hour battery life.',
    featured: true,
    stock: 25,
    colors: ['black', 'white', 'blue'],
  },
  {
    id: '4',
    name: 'Smart Home Speaker',
    category: 'audio',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    description: 'Voice-controlled smart speaker with premium sound and built-in virtual assistant. Control your smart home and enjoy immersive audio experience.',
    featured: false,
    stock: 12,
    colors: ['charcoal', 'sand'],
  },
  {
    id: '5',
    name: 'Leather Messenger Bag',
    category: 'accessories',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    description: 'Handcrafted premium leather messenger bag with multiple compartments and padded laptop sleeve. Combines timeless style with modern functionality.',
    featured: true,
    stock: 7,
    colors: ['brown', 'black'],
  },
  {
    id: '6',
    name: 'Ceramic Pour-Over Coffee Set',
    category: 'kitchen',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    description: 'Elegant ceramic pour-over coffee dripper with matching carafe and two cups. Perfect for coffee enthusiasts who appreciate precision brewing and beautiful design.',
    featured: false,
    stock: 20,
    colors: ['white', 'black'],
  },
  {
    id: '7',
    name: 'Modular Wall Shelf System',
    category: 'furniture',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    description: 'Customizable wall shelf system with modular components. Create your perfect storage solution with this versatile and contemporary design.',
    featured: false,
    stock: 9,
    colors: ['walnut', 'oak', 'black'],
  },
  {
    id: '8',
    name: 'Minimalist Analog Watch',
    category: 'accessories',
    price: 119.99,
    discountPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    description: 'Ultra-thin analog watch with sapphire crystal and premium leather strap. Elegantly designed for those who appreciate simplicity and precision.',
    featured: true,
    stock: 14,
    colors: ['black/tan', 'silver/brown', 'gold/black'],
  },
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'audio', name: 'Audio' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'kitchen', name: 'Kitchen' },
];

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    userId: 'user1',
    items: [
      { ...mockProducts[0], quantity: 1 },
      { ...mockProducts[2], quantity: 2 }
    ],
    total: 269.97,
    status: 'delivered',
    date: new Date('2023-11-15'),
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
      phone: '+1 (555) 123-4567'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ord-002',
    userId: 'user1',
    items: [
      { ...mockProducts[4], quantity: 1 }
    ],
    total: 159.99,
    status: 'processing',
    date: new Date('2023-12-01'),
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
      phone: '+1 (555) 123-4567'
    },
    paymentMethod: 'PayPal'
  }
];

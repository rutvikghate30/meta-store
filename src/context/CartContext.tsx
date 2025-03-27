
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../lib/data';
import { toast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1, color?: string, size?: string) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
                (!color || item.color === color) && 
                (!size || item.size === size)
      );
      
      let newItems;
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item if it doesn't exist
        const newItem: CartItem = {
          ...product,
          quantity,
          color,
          size,
        };
        newItems = [...prevItems, newItem];
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} ${quantity > 1 ? `(${quantity})` : ''} has been added to your cart.`,
        duration: 3000,
      });
      
      return newItems;
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === id);
      const newItems = prevItems.filter(item => item.id !== id);
      
      if (removedItem) {
        toast({
          title: "Removed from cart",
          description: `${removedItem.name} has been removed from your cart.`,
          duration: 3000,
        });
      }
      
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 3000,
    });
  };

  // Calculate total items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + price * item.quantity;
  }, 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

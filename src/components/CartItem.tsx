
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const price = item.discountPrice || item.price;
  
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-start space-x-4 py-6 animate-fade-in">
      {/* Product Image */}
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        <div className="relative h-24 w-24 overflow-hidden rounded-md bg-secondary/20">
          <img 
            src={item.image} 
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <Link to={`/product/${item.id}`}>
            <h3 className="font-medium hover:text-primary transition-colors">{item.name}</h3>
          </Link>
          <p className="font-medium">${(price * item.quantity).toFixed(2)}</p>
        </div>
        
        <div className="mt-1 text-sm text-muted-foreground">
          <p>${price.toFixed(2)} each</p>
          
          {item.color && (
            <p className="mt-1">
              Color: <span className="capitalize">{item.color}</span>
            </p>
          )}
          
          {item.size && (
            <p className="mt-1">
              Size: <span className="uppercase">{item.size}</span>
            </p>
          )}
        </div>
        
        {/* Quantity Controls */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7" 
              onClick={handleDecrease}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7" 
              onClick={handleIncrease}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleRemove}
          >
            <Trash className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

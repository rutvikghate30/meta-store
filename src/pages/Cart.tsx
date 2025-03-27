
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

const Cart = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  
  // Calculate shipping and tax
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">Your Cart</h1>
          <p className="text-muted-foreground mb-8">
            Review your items before checking out.
          </p>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products" className='text-white'>
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Shopping Cart ({items.length})</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearCart}
                      className="text-muted-foreground"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="divide-y">
                    {items.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border p-6 sticky top-24">
                  <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6" size="lg" asChild>
                    <Link className='text-white' to={user ? "/checkout" : "/login?redirect=checkout"}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-3">Payment Methods</h3>
                    <div className="flex items-center space-x-4">
                      {/* Payment Icons */}
                      <div className="bg-secondary/30 w-12 h-8 rounded flex items-center justify-center text-xs">Visa</div>
                      <div className="bg-secondary/30 w-12 h-8 rounded flex items-center justify-center text-xs">MC</div>
                      <div className="bg-secondary/30 w-12 h-8 rounded flex items-center justify-center text-xs">Amex</div>
                      <div className="bg-secondary/30 w-12 h-8 rounded flex items-center justify-center text-xs">PayPal</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

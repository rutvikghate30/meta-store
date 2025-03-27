
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addItem } = useCart();

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div 
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover-lift bg-card hover:shadow-elegant-lg border border-primary/10",
          featured && "md:row-span-2 md:col-span-2"
        )}
      >
        {/* Product Image */}
        <div className={cn(
          "relative aspect-square w-full overflow-hidden bg-primary/5",
          featured && "md:aspect-[4/3]"
        )}>
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {product.discountPrice && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
            </div>
          )}
          
          {/* Cart Button */}
          <div className="absolute right-2 bottom-2 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button 
              size="icon" 
              onClick={handleAddToCart}
              className="bg-background/80 backdrop-blur-sm hover:bg-primary/20 shadow-md border border-primary/20"
            >
              <ShoppingCart className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className={cn(
              "font-medium transition-colors group-hover:text-primary",
              featured ? "text-lg" : "text-base"
            )}>
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
              <span className="text-xs">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>
          
          {/* Price */}
          <div className="flex items-center space-x-2 mt-auto">
            {product.discountPrice ? (
              <>
                <span className="font-medium text-primary">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-medium text-primary">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

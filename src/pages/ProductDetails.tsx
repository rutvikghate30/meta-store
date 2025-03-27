
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { mockProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Star, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(mockProducts[0]);
  const [relatedProducts, setRelatedProducts] = useState(mockProducts.slice(0, 3));
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const { addItem } = useCart();
  
  // Get product details
  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default selected color if available
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      // Set default selected size if available
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      
      // Get related products from same category
      const related = mockProducts
        .filter(p => p.id !== id && p.category === foundProduct.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);
  
  // Handle quantity change
  const incrementQuantity = () => {
    setQuantity(q => Math.min(q + 1, product.stock));
  };
  
  const decrementQuantity = () => {
    setQuantity(q => Math.max(q - 1, 1));
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
  };
  
  if (!product) {
    return (
      <Layout>
        <div className="container-tight py-16 text-center">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Return to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-tight">
          {/* Back Button */}
          <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Products
          </Link>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none bg-secondary mb-2">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                <h1 className="text-2xl md:text-3xl font-medium mb-2">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "h-4 w-4 mr-0.5", 
                          i < Math.floor(product.rating) 
                            ? "fill-primary text-primary" 
                            : "text-muted-foreground"
                        )} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({Math.floor(product.rating * 20)} reviews)
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center space-x-3 mb-6">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl font-medium">
                        ${product.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-medium px-1.5 py-0.5 bg-primary text-primary-foreground rounded-sm">
                        SAVE {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>
              </div>
              
              {/* Options */}
              <div className="space-y-6">
                {/* Color Options */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          className={cn(
                            "group relative h-9 w-9 rounded-full border flex items-center justify-center transition-all",
                            selectedColor === color 
                              ? "ring-2 ring-primary ring-offset-2" 
                              : "hover:ring-2 hover:ring-muted hover:ring-offset-2"
                          )}
                          onClick={() => setSelectedColor(color)}
                          type="button"
                          title={color}
                        >
                          <span
                            className="h-6 w-6 rounded-full"
                            style={{ 
                              backgroundColor: 
                                color === 'black' ? '#000' :
                                color === 'white' ? '#fff' :
                                color === 'silver' ? '#c0c0c0' :
                                color === 'gray' ? '#808080' :
                                color === 'red' ? '#e53e3e' :
                                color === 'blue' ? '#3182ce' :
                                color === 'green' ? '#38a169' :
                                color
                            }}
                          />
                          {selectedColor === color && (
                            <Check className={cn(
                              "absolute h-3 w-3",
                              color === 'white' || color === 'silver' ? "text-black" : "text-white"
                            )} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Size Options */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          className={cn(
                            "flex h-9 min-w-[2.5rem] items-center justify-center rounded-md border px-2 text-sm transition-colors",
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input hover:bg-secondary"
                          )}
                          onClick={() => setSelectedSize(size)}
                          type="button"
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="w-12 text-center">{quantity}</span>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    
                    <span className="text-sm text-muted-foreground ml-3">
                      {product.stock} available
                    </span>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto mt-2" 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t space-y-4 text-sm">
                <div className="flex">
                  <span className="font-medium w-32">Availability:</span>
                  <span>{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-32">Category:</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-32">SKU:</span>
                  <span>SKU-{product.id.padStart(6, '0')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-medium mb-8">You may also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

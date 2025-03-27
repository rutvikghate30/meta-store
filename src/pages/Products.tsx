
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import { mockProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [maxPrice, setMaxPrice] = useState(300);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const isMobile = useIsMobile();

  // Initialize max price based on highest product price
  useEffect(() => {
    const highestPrice = Math.max(...mockProducts.map(product => product.price));
    setMaxPrice(Math.ceil(highestPrice / 50) * 50); // Round to nearest 50
    setPriceRange([0, Math.ceil(highestPrice / 50) * 50]);
  }, []);

  // Filter products whenever filters change
  useEffect(() => {
    let filtered = [...mockProducts];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => {
        const price = product.discountPrice || product.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, priceRange]);

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-tight">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Shop Our Collection</h1>
            <p className="text-muted-foreground">
              Discover our curated selection of premium products designed for modern living.
            </p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 input-elegant"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Mobile Filter */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-6">Filters</h3>
                    <ProductFilter
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      maxPrice={maxPrice}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            {!isMobile && (
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <h3 className="text-lg font-medium mb-6">Filters</h3>
                  <ProductFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    maxPrice={maxPrice}
                  />
                </div>
              </div>
            )}
            
            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-secondary p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setPriceRange([0, maxPrice]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Results Count */}
                  <div className="mb-4 text-sm text-muted-foreground">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </div>
                  
                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

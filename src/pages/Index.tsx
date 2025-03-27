
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/lib/data';
import FeaturedCarousel from '@/components/FeaturedCarousel';

const Index = () => {
  // Get featured products
  const featuredProducts = mockProducts.filter(product => product.featured).slice(0, 4);
  // Get top products (sorted by rating)
  const topProducts = [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, 6);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pt-32 md:pb-24 bg-gradient-to-b from-background to-secondary/40">
        <div className="container-tight relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="mb-8 inline-block">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none bg-black/10 text-black border-black/20">
                New Collection
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 max-w-2xl animate-fade-in bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
              Discover Our Premium Collection
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-xl animate-slide-up">
              Minimalist design meets exceptional quality. Explore our curated selection of premium products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button size="lg" className="group bg-black text-white hover:bg-black/90" asChild>
                <Link to="/products">
                  <ShoppingBag className="mr-2 h-5 w-5 " />
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-black/20 hover:bg-black/5" asChild>
                <Link to="/products">View Collection</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-black/5 blur-3xl opacity-50 animate-pulse-soft" />
      </section>
      
      {/* Top Products Carousel */}
      <section className="py-16 bg-gradient-to-r from-secondary/30 to-secondary/10">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
                Top Products
              </h2>
              <p className="text-muted-foreground mt-2">Our highest rated items</p>
            </div>
            <Link to="/products" className="group inline-flex items-center mt-4 md:mt-0 text-sm font-medium text-black hover:text-black/80 transition-colors">
              View All
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <FeaturedCarousel products={topProducts} />
        </div>
      </section>
      
      {/* Featured Products Grid */}
      <section className="py-16">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-muted-foreground mt-2">Our most popular designs</p>
            </div>
            <Link to="/products" className="group inline-flex items-center mt-4 md:mt-0 text-sm font-medium text-black hover:text-black/80 transition-colors">
              View All
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Collection Highlight */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/40">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6 inline-block">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none bg-black/10 text-black border-black/20">
                  New Season
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-medium mb-6 bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
                Thoughtfully Designed, Precisely Crafted
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-xl">
                Our products combine minimalist aesthetics with exceptional functionality. Each piece is crafted with meticulous attention to detail and a commitment to quality materials.
              </p>
              
              <Button className="bg-black text-white hover:bg-black/90" asChild>
                <Link to="/products">Shop Collection</Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-black/5 shadow-elegant">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Collection highlight" 
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-secondary/30 to-secondary/10">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium mb-4 bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We believe in quality, simplicity, and attention to detail.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm border border-black/10 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-black/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">Sustainable Materials</h3>
              <p className="text-muted-foreground">We source responsibly and prioritize sustainable materials.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm border border-black/10 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-black/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">Premium Craftsmanship</h3>
              <p className="text-muted-foreground">Each product is meticulously crafted with attention to every detail.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm border border-black/10 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-black/10 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m8 14 2.5-2.5c.83-.83 2.17-.83 3 0L16 14" />
                  <path d="m8 10 2.5-2.5c.83-.83 2.17-.83 3 0L16 10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">Intuitive Design</h3>
              <p className="text-muted-foreground">Our products blend seamlessly into your lifestyle, enhancing without complicating.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container-narrow text-center">
          <h2 className="text-2xl md:text-3xl font-medium mb-4 bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
            Join Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Subscribe to receive updates on new collections, exclusive offers and design inspiration.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow input-elegant"
              />
              <Button className="bg-black text-white hover:bg-black/90">Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-out-soft backdrop-blur-md",
        isScrolled 
          ? "py-3 bg-background/90 shadow-sm" 
          : "py-5 bg-background/80"
      )}
    >
      <div className="container-tight">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-medium tracking-tighter transition-transform hover:scale-105"
          >
            META STORE
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-sm transition-colors", 
                location.pathname === "/" 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "text-sm transition-colors", 
                location.pathname === "/products" 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Shop
            </Link>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative group">
              <Search className="h-5 w-5 transition-colors group-hover:stroke-black" />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative group">
                <ShoppingCart className="h-5 w-5 transition-colors group-hover:stroke-black" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black  text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Hi, {user.name.split(' ')[0]}</span>
                <div className="flex items-center space-x-1">
                  {user.isAdmin && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm">Admin</Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="group">
                  <User className="h-5 w-5 transition-colors group-hover:stroke-black" />
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-black-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t overflow-hidden transition-all duration-300 ease-out-soft",
          isMenuOpen ? "max-h-screen py-5" : "max-h-0 py-0 border-transparent"
        )}
      >
        <div className="container-tight flex flex-col space-y-5">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={cn(
                "py-2 text-base transition-colors", 
                location.pathname === "/" 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={cn(
                "py-2 text-base transition-colors", 
                location.pathname === "/products" 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground"
              )}
            >
              Shop
            </Link>
          </div>
          
          {user ? (
            <div className="flex flex-col space-y-3 pt-2 border-t">
              <span className="text-sm text-muted-foreground">Logged in as {user.name}</span>
              {user.isAdmin && (
                <Link to="/admin" className="py-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start" 
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pt-2 border-t">
              <Link to="/login" className="py-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="py-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


import React from 'react';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import { pageSlideUp } from '@/lib/animations';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageSlideUp}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="py-8 px-6 border-t">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-medium mb-4">Meta Store</h5>
              <p className="text-muted-foreground">
                We create beautiful, functional products with a focus on simplicity and user experience.
              </p>
            </div>
            
            <div>
              <h5 className="text-lg font-medium mb-4">Links</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cart
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-medium mb-4">Contact</h5>
              <address className="not-italic text-muted-foreground">
                <p>123 Design Street</p>
                <p>San Francisco, CA 94103</p>
                <p className="mt-2">contact@metastore.com</p>
              </address>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} Meta Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

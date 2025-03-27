
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with 1s delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app, this would be a backend API call
      if (email === 'user@example.com' && password === 'password') {
        const userData: User = {
          id: 'user1',
          email: 'user@example.com',
          name: 'John Doe',
          isAdmin: false
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else if (email === 'admin@example.com' && password === 'admin') {
        const adminData: User = {
          id: 'admin1',
          email: 'admin@example.com',
          name: 'Admin User',
          isAdmin: true
        };
        
        setUser(adminData);
        localStorage.setItem('user', JSON.stringify(adminData));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with 1s delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in a real app, this would be a backend API call
      const userData: User = {
        id: `user${Date.now()}`,
        email,
        name,
        isAdmin: false
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

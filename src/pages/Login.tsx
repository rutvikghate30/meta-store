
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query params
  const query = new URLSearchParams(location.search);
  const redirectTo = query.get('redirect') || '/';
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await login(email, password);
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-narrow">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-medium mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded">
                    {error}
                  </div>
                )}
                
                <div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Don't have an account?
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/register">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-center text-muted-foreground mb-4">
                  Demo Accounts:
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="border rounded p-2">
                    <p className="font-medium mb-1">Regular User</p>
                    <p>Email: user@example.com</p>
                    <p>Password: password</p>
                  </div>
                  <div className="border rounded p-2">
                    <p className="font-medium mb-1">Admin</p>
                    <p>Email: admin@example.com</p>
                    <p>Password: admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

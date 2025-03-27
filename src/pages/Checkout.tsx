
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Check, ChevronLeft, ChevronRight, CreditCard, Landmark, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

// Checkout steps
const STEPS = {
  INFORMATION: 0,
  SHIPPING: 1,
  PAYMENT: 2,
  CONFIRMATION: 3
};

const Checkout = () => {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.INFORMATION);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  });
  
  // Calculate order amounts
  const shipping = formData.shippingMethod === 'express' ? 20 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && step !== STEPS.CONFIRMATION) {
      navigate('/cart');
    }
  }, [items, navigate, step]);
  
  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle radio change
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Go to next step
  const nextStep = () => {
    // Validation could be added here
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  // Go to previous step
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle order submission
  const placeOrder = async () => {
    setLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Order successful
      clearCart();
      setStep(STEPS.CONFIRMATION);
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and is being processed.",
      });
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-tight">
          {/* Checkout Progress */}
          <div className="mb-10">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-between">
                {['Information', 'Shipping', 'Payment', 'Confirmation'].map((label, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium",
                      step === idx 
                        ? "bg-primary text-primary-foreground" 
                        : step > idx 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary text-muted-foreground border"
                    )}
                  >
                    {step > idx ? <Check className="h-5 w-5" /> : idx + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className={cn(step >= STEPS.INFORMATION ? "text-primary font-medium" : "text-muted-foreground")}>
                Information
              </span>
              <span className={cn(step >= STEPS.SHIPPING ? "text-primary font-medium" : "text-muted-foreground")}>
                Shipping
              </span>
              <span className={cn(step >= STEPS.PAYMENT ? "text-primary font-medium" : "text-muted-foreground")}>
                Payment
              </span>
              <span className={cn(step >= STEPS.CONFIRMATION ? "text-primary font-medium" : "text-muted-foreground")}>
                Confirmation
              </span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Information */}
              {step === STEPS.INFORMATION && (
                <div className="bg-card rounded-lg border p-6 animate-fade-in">
                  <h2 className="text-xl font-medium mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Street address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State / Province</Label>
                        <Input
                          id="state"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Postal Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          placeholder="Postal code"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={nextStep}>
                        Continue to Shipping
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Shipping */}
              {step === STEPS.SHIPPING && (
                <div className="bg-card rounded-lg border p-6 animate-fade-in">
                  <h2 className="text-xl font-medium mb-6">Shipping Method</h2>
                  
                  <RadioGroup 
                    value={formData.shippingMethod} 
                    onValueChange={(value) => handleRadioChange('shippingMethod', value)}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 flex justify-between cursor-pointer">
                        <div>
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-muted-foreground">Delivery in 5-7 business days</div>
                        </div>
                        <div className="font-medium">$10.00</div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 flex justify-between cursor-pointer">
                        <div>
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-muted-foreground">Delivery in 2-3 business days</div>
                        </div>
                        <div className="font-medium">$20.00</div>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={prevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Continue to Payment
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Payment */}
              {step === STEPS.PAYMENT && (
                <div className="bg-card rounded-lg border p-6 animate-fade-in">
                  <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                  
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={(value) => handleRadioChange('paymentMethod', value)}
                    className="space-y-4 mb-8"
                  >
                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="flex-1 flex items-center space-x-3 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Credit Card</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 rounded-lg border p-4">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 flex items-center space-x-3 cursor-pointer">
                        <Landmark className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Bank Transfer</span>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.paymentMethod === 'credit' && (
                    <div className="space-y-4 border-t pt-6">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="Full name on card"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvc">CVC</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formData.paymentMethod === 'bank' && (
                    <div className="space-y-4 border-t pt-6">
                      <p className="text-sm text-muted-foreground">
                        Please use the following information to complete the bank transfer:
                      </p>
                      <div className="bg-secondary/30 p-4 rounded text-sm">
                        <div className="mb-2">
                          <span className="font-medium">Bank Name:</span> ACME Bank
                        </div>
                        <div className="mb-2">
                          <span className="font-medium">Account Number:</span> 1234567890
                        </div>
                        <div className="mb-2">
                          <span className="font-medium">Routing Number:</span> 987654321
                        </div>
                        <div>
                          <span className="font-medium">Reference:</span> Your Order ID will be provided after checkout
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={prevStep}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button 
                      onClick={placeOrder} 
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Confirmation */}
              {step === STEPS.CONFIRMATION && (
                <div className="bg-card rounded-lg border p-6 animate-fade-in text-center">
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <BadgeCheck className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-medium mb-3">Order Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your order has been placed and is being processed. You will receive an email confirmation shortly.
                  </p>
                  
                  <div className="bg-secondary/30 p-4 rounded-lg mb-6 inline-block">
                    <div className="text-sm">
                      <p className="font-medium">Order Number</p>
                      <p className="text-muted-foreground">#ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button asChild>
                      <a href="/products">
                        Continue Shopping
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            {step < STEPS.CONFIRMATION && (
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border p-6 sticky top-24">
                  <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-16 w-16 rounded bg-secondary/20 overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm mt-1">${((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

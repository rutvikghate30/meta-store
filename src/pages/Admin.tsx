
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Product, mockProducts, mockOrders } from '@/lib/data';
import { PlusCircle, Pencil, Trash2, ChevronRight, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New product template
  const newProductTemplate: Product = {
    id: '',
    name: '',
    category: '',
    price: 0,
    image: '',
    rating: 0,
    description: '',
    featured: false,
    stock: 0
  };
  
  // Redirect if not admin
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page.",
        variant: "destructive"
      });
    }
  }, [user, navigate]);
  
  // Handle product form change
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const parsedValue = type === 'number' 
      ? parseFloat(value) 
      : type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value;
    
    setEditingProduct(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: parsedValue };
    });
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setEditingProduct(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: checked };
    });
  };
  
  // Handle product save
  const handleSaveProduct = () => {
    if (!editingProduct) return;
    
    if (editingProduct.id) {
      // Update existing product
      setProducts(prev => 
        prev.map(p => p.id === editingProduct.id ? editingProduct : p)
      );
      toast({
        title: "Product Updated",
        description: `${editingProduct.name} has been updated successfully.`
      });
    } else {
      // Add new product
      const newProduct = {
        ...editingProduct,
        id: Date.now().toString(),
        rating: 0
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added successfully.`
      });
    }
    
    setIsDialogOpen(false);
    setEditingProduct(null);
  };
  
  // Handle product delete
  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "The product has been deleted successfully."
    });
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Manage your store, products, and orders
          </p>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$429.99</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">
                  +12 new products
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  +2 new customers
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-sm mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Products</h2>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className='text-white' onClick={() => setEditingProduct(newProductTemplate)}>
                      <PlusCircle className="h-4 w-4 mr-2 text-white" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct?.id ? 'Edit Product' : 'Add New Product'}
                      </DialogTitle>
                      <DialogDescription>
                        Fill in the details for this product. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    
                    {editingProduct && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                              Product Name
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={editingProduct.name}
                              onChange={handleProductChange}
                              placeholder="Product name"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-1">
                              Category
                            </label>
                            <select
                              id="category"
                              name="category"
                              value={editingProduct.category}
                              onChange={handleProductChange}
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <option value="">Select category</option>
                              <option value="furniture">Furniture</option>
                              <option value="lighting">Lighting</option>
                              <option value="audio">Audio</option>
                              <option value="accessories">Accessories</option>
                              <option value="kitchen">Kitchen</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium mb-1">
                              Price ($)
                            </label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              value={editingProduct.price}
                              onChange={handleProductChange}
                              placeholder="0.00"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="discountPrice" className="block text-sm font-medium mb-1">
                              Discount Price ($) (Optional)
                            </label>
                            <Input
                              id="discountPrice"
                              name="discountPrice"
                              type="number"
                              value={editingProduct.discountPrice || ''}
                              onChange={handleProductChange}
                              placeholder="0.00"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="stock" className="block text-sm font-medium mb-1">
                              Stock
                            </label>
                            <Input
                              id="stock"
                              name="stock"
                              type="number"
                              value={editingProduct.stock}
                              onChange={handleProductChange}
                              placeholder="0"
                            />
                          </div>
                          
                          <div className="col-span-2">
                            <label htmlFor="image" className="block text-sm font-medium mb-1">
                              Image URL
                            </label>
                            <Input
                              id="image"
                              name="image"
                              value={editingProduct.image}
                              onChange={handleProductChange}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          
                          <div className="col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium mb-1">
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={editingProduct.description}
                              onChange={handleProductChange}
                              placeholder="Product description"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px]"
                            />
                          </div>
                          
                          <div className="col-span-2">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                name="featured"
                                checked={editingProduct.featured}
                                onChange={handleCheckboxChange}
                                className="rounded border-gray-300"
                              />
                              <span className="text-sm font-medium">Featured Product</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className='text-white' onClick={handleSaveProduct}>Save Product</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="hidden md:table-cell text-center">Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded bg-secondary/20 overflow-hidden">
                              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell capitalize">{product.category}</TableCell>
                        <TableCell className="text-right">
                          {product.discountPrice ? (
                            <div>
                              <span className="font-medium">${product.discountPrice.toFixed(2)}</span>
                              <span className="text-sm text-muted-foreground line-through ml-2">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-center">
                          <span className={product.stock <= 5 ? "text-destructive" : ""}>{product.stock}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingProduct(product);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Orders</h2>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
                        <TableCell>{order.shippingAddress.fullName}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'processing' 
                                ? 'bg-blue-100 text-blue-800' 
                                : order.status === 'cancelled' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;

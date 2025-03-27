
import React from 'react';
import { categories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ProductFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  maxPrice
}) => {
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className={cn(
                "text-xs rounded-full bg-transparent",
                selectedCategory === category.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="text-sm font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, maxPrice]}
            min={0}
            max={maxPrice}
            step={1}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="text-sm font-medium mb-3">Availability</h4>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" defaultChecked />
            <span>In Stock</span>
          </label>
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <span>Out of Stock</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

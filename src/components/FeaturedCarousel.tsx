
import React from 'react';
import { Product } from '@/lib/data';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import ProductCard from './ProductCard';

interface FeaturedCarouselProps {
  products: Product[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ products }) => {
  return (
    <div className="relative px-4 sm:px-8 md:px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 border border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/10" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 border border-primary/20 bg-background/80 backdrop-blur-sm hover:bg-primary/10" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedCarousel;

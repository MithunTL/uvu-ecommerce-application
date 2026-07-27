'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.mainImage,
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-zinc-400 dark:text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <Link href={`/product/${product.id}`} className="group flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-2xl/10 hover:border-zinc-350 dark:hover:border-zinc-700 transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white dark:bg-zinc-950 p-2 flex items-center justify-center">
        <img
          src={product.mainImage}
          alt={product.name}
          className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {product.stock <= 5 && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-bold bg-red-500/10 text-red-650 dark:text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full z-10">
            Low Stock
          </span>
        )}
      </div>

      {/* Info Content */}
      <div className="flex flex-col flex-1 p-5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-800 dark:text-zinc-400 mb-1">
          {product.category}
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-white transition-colors duration-200 line-clamp-1 mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-300">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-lg font-bold text-zinc-950 dark:text-white">
            ${product.price.toLocaleString()}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
              product.stock === 0
                ? 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white dark:bg-emerald-600 shadow-sm'
                : 'bg-zinc-950 text-white hover:bg-zinc-850 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white hover:shadow-md'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : isAdded ? 'Item Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}

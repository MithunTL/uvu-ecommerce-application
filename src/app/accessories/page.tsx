'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

function AccessoriesCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read search parameters for initial filters
  const categoryParam = searchParams.get('category') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';
  const queryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [priceRange, setPriceRange] = useState<number>(3000);
  // Initialize catalog with only laptops and desktops (excluding tablets and accessories)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    PRODUCTS.filter((p) => p.category === 'laptops' || p.category === 'desktops')
  );

  // Sync state with URL search params when they change
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSelectedSort(sortParam);
    setSearchQuery(queryParam);
  }, [categoryParam, sortParam, queryParam]);

  // Handle filter changes
  useEffect(() => {
    // Only display laptops and desktops in this catalog page
    let result = PRODUCTS.filter((p) => p.category === 'laptops' || p.category === 'desktops');

    // 1. Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // 3. Filter by price
    result = result.filter((p) => p.price <= priceRange);

    // 4. Sort results
    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedSort, searchQuery, priceRange]);

  const updateUrl = (category: string, sort: string, q: string) => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (sort !== 'featured') params.set('sort', sort);
    if (q !== '') params.set('q', q);

    router.push(`/accessories?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateUrl(category, selectedSort, searchQuery);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    updateUrl(selectedCategory, sort, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateUrl(selectedCategory, selectedSort, val);
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'desktops', name: 'Desktops' },
    // { id: 'accessories', name: 'Accessories' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      {/* Header section */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
          UVU Catalog
        </h1>
        <p className="text-sm text-zinc-800 dark:text-zinc-350 mt-2 font-semibold">
          Discover high-performance laptops, desktops, and accessories.
        </p>
      </div>

      {/* Grid container: Sidebar + Main Listing */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search bar */}
          <div className="space-y-2">
            <label className="text-sm font-extrabold text-zinc-950 dark:text-zinc-100">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search catalog..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-100 transition-colors"
              />
              <svg
                className="absolute left-3.5 top-3 w-4 h-4 text-zinc-700 dark:text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter list */}
          <div className="space-y-2">
            <span className="text-sm font-extrabold text-zinc-950 dark:text-zinc-100">Categories</span>
            <div className="flex flex-col gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`text-left px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${selectedCategory === cat.id
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-black shadow'
                    : 'text-zinc-800 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center text-sm font-extrabold">
              <span className="text-zinc-950 dark:text-zinc-100">Max Price</span>
              <span className="text-zinc-950 dark:text-white">${priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="50"
              max="3000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-950 dark:accent-white"
            />
            <div className="flex justify-between text-[10px] text-zinc-800 dark:text-zinc-400 font-extrabold">
              <span>$50</span>
              <span>$3,000</span>
            </div>
          </div>
        </div>

        {/* Listing Grid */}
        <div className="lg:col-span-3">
          {/* Top toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-sm text-zinc-850 dark:text-zinc-300 font-bold">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-zinc-850 dark:text-zinc-300 font-extrabold uppercase">Sort By:</span>
              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-955 dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Grid items */}
          {/* Grid items */}
          {selectedCategory === 'accessories' ? (
            <div className="lg:col-span-3 text-center py-20 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 border border-amber-200 dark:border-zinc-800/80 p-8 rounded-3xl max-w-2xl mx-auto w-full">
              <div className="mx-auto w-16 h-16 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-6 border border-amber-500/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                Accessories Catalog Coming Soon
              </h3>
              <p className="mt-3 text-sm text-zinc-800 dark:text-zinc-350 max-w-md mx-auto font-medium leading-relaxed">
                We are currently setting up our custom-tuned accessories collection. Our complete list of accessories will be added shortly next week. Please check back soon!
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <button
                  onClick={() => handleCategoryChange('laptops')}
                  className="px-5 py-2.5 rounded-full bg-zinc-955 text-white dark:bg-white dark:text-black font-bold text-xs transition-colors cursor-pointer"
                >
                  Shop Laptops
                </button>
                <button
                  onClick={() => handleCategoryChange('desktops')}
                  className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 font-bold text-xs transition-colors cursor-pointer"
                >
                  Shop Desktops
                </button>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/10 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl">
              <svg
                className="mx-auto w-12 h-12 text-zinc-800 dark:text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-base font-bold text-zinc-955 dark:text-white">
                No products found
              </h3>
              <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-300 max-w-xs mx-auto font-medium">
                Try widening your search keywords, adjusting the price slider, or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSort('featured');
                  setSearchQuery('');
                  setPriceRange(3000);
                  updateUrl('all', 'featured', '');
                }}
                className="mt-6 px-5 py-2.5 rounded-full bg-zinc-955 text-white dark:bg-white dark:text-black font-bold text-xs transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center min-h-[50vh] bg-white dark:bg-black transition-colors duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-zinc-950 dark:border-white border-t-transparent animate-spin" />
            <span className="text-sm text-zinc-850 dark:text-zinc-300 font-bold">Loading catalog...</span>
          </div>
        </div>
      }
    >
      <AccessoriesCatalog />
    </Suspense>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  useEffect(() => {
    const target = window.sessionStorage.getItem('uvu-scroll-target');
    if (!target) return;

    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.sessionStorage.removeItem('uvu-scroll-target');
  }, []);
  // Filter featured products to only include laptops and desktops (removing tablets and accessories)
  const featuredProducts = PRODUCTS.filter(
    (p) => p.category === 'laptops' || p.category === 'desktops'
  ).slice(0, 4);

  const [showComingSoon, setShowComingSoon] = useState(false);

  const categories = [
    {
      name: 'Laptops',
      description: 'Supercharged by UVU Silicon',
      href: '/accessories?category=laptops',
      gradient: 'from-blue-600 to-indigo-700 dark:from-blue-900/60 dark:to-indigo-950/60',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Desktops',
      description: 'Power that fits on your desk',
      href: '/accessories?category=desktops',
      gradient: 'from-purple-600 to-pink-700 dark:from-purple-900/60 dark:to-pink-950/60',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80',
    },
    {
      name: 'Accessories',
      description: 'Elevate your visual workflow',
      href: '#',
      gradient: 'from-amber-500 to-orange-600 dark:from-amber-900/60 dark:to-orange-950/60',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80',

      isPlaceholder: true,
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300 mb-24">
        <div className="absolute inset-0 bg-radial-gradient from-zinc-200/20 to-transparent dark:from-zinc-800/30 dark:to-black z-0 pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col space-y-6 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-400">
                Introducing Dell XPS 16"
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Mind-blowing. <br />
                <span className="bg-gradient-to-r from-zinc-950 to-zinc-200 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                  Power-house.
                </span>
              </h1>
              <p className="max-w-md text-lg text-zinc-800 dark:text-zinc-200 mx-auto md:mx-0 font-semibold leading-relaxed">
                Supercharged by Intel Core Ultra 9 processors. Designed for those who push the limits of creativity and productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Link
                  href="/product/dell-xps-16"
                  className="px-8 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 font-bold text-sm transition-colors shadow-lg hover:shadow-xl text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
            <div className="relative aspect-video md:aspect-auto md:h-[400px] flex items-center justify-center">
              <div className="relative w-full max-w-[500px] hover:scale-102 transition-transform duration-500">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-xl" />
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80"
                  alt="Dell XPS 16 Laptop"
                  className="object-contain w-full drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Category Section */}
      <section className="mb-20 ">
        <div className="max-w-[1280px] mx-auto px-4 pb-20 border-b border-zinc-200 dark:border-zinc-800" >
          <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 mb-8">
            Shop by Category
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const isPlaceholder = 'isPlaceholder' in cat && cat.isPlaceholder;
              const handleClick = (e: React.MouseEvent) => {
                if (isPlaceholder) {
                  e.preventDefault();
                  setShowComingSoon(true);
                }
              };

              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={handleClick}
                  className={`group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${cat.gradient} border border-zinc-200/20 dark:border-zinc-800/10 hover:shadow-lg dark:hover:shadow-2xl/10 transition-all duration-300`}
                >
                  <div className="z-10 mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                    <p className="text-xs text-white font-bold">{cat.description}</p>
                  </div>
                  <div className="relative transform group-hover:scale-105 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="object-cover w-full h-full md:h-[162px] drop-shadow-lg rounded-[6px]"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* Featured Products Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex md:justify-between items-end mb-8">
            <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">Products</h3>
            <Link
              href="/accessories"
              className="text-sm font-bold text-zinc-950 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300 flex items-center gap-1 group border-b border-zinc-900 dark:border-zinc-100 pb-0.5"
            >
              Shop All Store
              <span className="transform group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions Grid (Apple style) */}
      <section className="px-4 sm:px-6 lg:px-8 mb-28" id="uvu-care-warranty">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid  gap-8">

            <div className="flex gap-4 items-start text-center md:text-left flex-col md:flex-row">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mx-auto md:mx-0 border border-zinc-200 dark:border-zinc-800">
                <svg className="w-6 h-6 text-zinc-955 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.954 11.954 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-955 dark:text-zinc-50">3-Year UVU Care Warranty</h3>
                <p className="text-sm text-zinc-800 dark:text-zinc-300 mt-2 font-medium leading-relaxed">
                  Every desktop and laptop includes a comprehensive three-year limited warranty for peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center relative transition-transform duration-300 transform scale-100">
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mx-auto w-16 h-16 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mb-6 border border-amber-500/20">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
              Coming Soon
            </h3>
            <p className="mt-3 text-sm text-zinc-800 dark:text-zinc-300 font-medium leading-relaxed">
              Our Accessories collection will be added shortly, Stay tuned.
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="mt-6 w-full py-3 rounded-full bg-zinc-955 text-white dark:bg-white dark:text-black hover:bg-zinc-850 dark:hover:bg-zinc-100 font-bold text-xs transition-colors cursor-pointer"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

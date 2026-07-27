'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export function Header() {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Laptops', href: '/accessories?category=laptops' },
    { name: 'Desktops', href: '/accessories?category=desktops' },
    // { name: 'Accessories', href: '/accessories?category=accessories' },
    { name: 'Shop All', href: '/accessories' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo-header.png"
                alt="UVU | Dell Technologies | Terralogic"
                className="h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 w-auto object-contain transition-all dark:bg-white dark:px-2 dark:py-1 dark:rounded-lg"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '?');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-zinc-950 dark:hover:text-white ${isActive
                    ? 'text-zinc-950 dark:text-white font-bold'
                    : 'text-zinc-700 dark:text-zinc-400'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/orders"
              className={`transition-colors duration-200 hover:text-zinc-950 dark:hover:text-white ${pathname === '/orders'
                ? 'text-zinc-950 dark:text-white font-bold'
                : 'text-zinc-700 dark:text-zinc-400'
                }`}
            >
              Track Orders
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* User Auth display status */}
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-900 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
                  {user.name}
                </span>
                <button
                  onClick={signOut}
                  className="text-xs font-bold text-zinc-700 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center">
                <Link
                  href="/cart?step=auth"
                  className="text-xs font-bold text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors uppercase tracking-wider"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                // Sun Icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                // Moon Icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 focus:outline-none"
              aria-label="View Cart"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-bold text-white dark:bg-white dark:text-black ring-2 ring-white dark:ring-black animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                // Close Icon
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Menu Icon
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-955 transition-all duration-300 ease-in-out z-40">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-lg h-[100vh]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${isActive
                    ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white'
                    : 'text-zinc-800 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${pathname === '/orders'
                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white'
                : 'text-zinc-800 dark:text-zinc-450 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-950'
                }`}
            >
              Track Orders
            </Link>

            {/* Mobile Auth status details */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-3 px-3">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
                    {user.name}
                  </span>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-red-650 dark:text-red-400 uppercase tracking-wider cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/cart?step=auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-2 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-xl text-sm font-semibold"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

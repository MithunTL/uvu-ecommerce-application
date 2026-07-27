import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/accessories?category=laptops" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/accessories?category=desktops" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Desktops
                </Link>
              </li>
              {/* <li>
                <Link href="/accessories?category=tablets" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Tablets
                </Link>
              </li>
              <li>
                <Link href="/accessories?category=accessories" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Accessories
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">UVU Care+ Warranty</span>
              </li>
              {/* <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Easy Trade-in</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Financing Options</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Expert Setup & Support</span>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/cart" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  View Cart
                </Link>
              </li>
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Track Orders</span>
              </li>
              {/* <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Preferences</span>
              </li> */}
            </ul>
          </div>
          {/* <div>
            <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">About UVU</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Newsroom</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Careers</span>
              </li>
              <li>
                <span className="text-sm text-zinc-500 dark:text-zinc-500 cursor-default">Contact Store</span>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-600">
            &copy; {new Date().getFullYear()} UVU Computer Shop. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-400 dark:text-zinc-600">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Sales Policy</span>
            <span className="hover:underline cursor-pointer">Legal Documentation</span>
            {/* <span className="hover:underline cursor-pointer">Site Map</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

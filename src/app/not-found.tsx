import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 flex-1 flex flex-col items-center justify-center text-center bg-white dark:bg-black transition-colors duration-300">
      <div className="space-y-6 max-w-lg">
        {/* Sleek icon / visual element */}
        <div className="w-20 h-20 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mx-auto shadow-sm">
          <svg className="w-10 h-10 text-zinc-950 dark:text-zinc-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
          Coming Soon
        </h1>
        
        <p className="text-lg text-zinc-800 dark:text-zinc-300 font-medium">
          This page is not available yet. It will be available shortly.
        </p>

        <p className="text-sm text-zinc-600 dark:text-zinc-500 max-w-sm mx-auto">
          We are currently crafting this part of the UVU Computer Shop experience. Check back soon for updates.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-zinc-950 text-white hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 font-semibold text-sm transition-all shadow-md hover:shadow-lg inline-block"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

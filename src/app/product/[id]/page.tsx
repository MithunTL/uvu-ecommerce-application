'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS, ProductImages } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  // States
  const [activeView, setActiveView] = useState<keyof ProductImages>('front');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'highlights'>('specs');
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Reviews state
  const [localReviews, setLocalReviews] = useState<any[]>([]);
  // Form states
  const [formAuthor, setFormAuthor] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Edit reviews state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editHoverRating, setEditHoverRating] = useState<number | null>(null);

  // Load reviews from localStorage on mount
  useEffect(() => {
    if (product) {
      const saved = localStorage.getItem(`reviews-${product.id}`);
      if (saved) {
        try {
          setLocalReviews(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [product?.id]);

  const startEdit = (rev: any) => {
    setEditingId(rev.id);
    setEditTitle(rev.title);
    setEditContent(rev.content);
    setEditRating(rev.rating);
  };

  const saveEdit = (id: number) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    const updated = localReviews.map((r) =>
      r.id === id
        ? { ...r, title: editTitle, content: editContent, rating: editRating }
        : r
    );
    setLocalReviews(updated);
    if (product) {
      localStorage.setItem(`reviews-${product.id}`, JSON.stringify(updated));
    }
    setEditingId(null);
  };

  const deleteReview = (id: number) => {
    const updated = localReviews.filter((r) => r.id !== id);
    setLocalReviews(updated);
    if (product) {
      localStorage.setItem(`reviews-${product.id}`, JSON.stringify(updated));
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formTitle.trim() || !formContent.trim()) return;

    const newReview = {
      id: Date.now(),
      author: formAuthor,
      rating: formRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: formTitle,
      content: formContent,
    };

    const updated = [newReview, ...localReviews];
    setLocalReviews(updated);
    if (product) {
      localStorage.setItem(`reviews-${product.id}`, JSON.stringify(updated));
    }
    setFormAuthor('');
    setFormRating(5);
    setFormTitle('');
    setFormContent('');
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center bg-white dark:bg-black transition-colors duration-300">
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">Product Not Found</h2>
        <p className="text-zinc-800 dark:text-zinc-400 mt-2 font-medium">The product you are looking for does not exist.</p>
        <Link
          href="/accessories"
          className="mt-6 inline-block px-6 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-black font-bold text-sm rounded-full transition-colors"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.mainImage,
      category: product.category,
    }, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= fullStars ? 'text-amber-500 fill-amber-500' : 'text-zinc-300 dark:text-zinc-700'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      {/* Breadcrumbs */}
      <nav className="flex text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-8">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Home</Link>
        <span className="mx-2 text-zinc-800 dark:text-zinc-650">/</span>
        <Link href={`/accessories?category=${product.category}`} className="hover:text-zinc-950 dark:hover:text-white transition-colors">{product.category}</Link>
        <span className="mx-2 text-zinc-800 dark:text-zinc-650">/</span>
        <span className="text-zinc-950 dark:text-white truncate">{product.name}</span>
      </nav>

      {/* Main product presentation grid */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Side: Product Gallery */}
        <div className="flex flex-col gap-6">
          {/* Large Preview Box with Hover Zoom */}
          <div
            className="relative aspect-video w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden flex items-center justify-center p-6 cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
          >
            <img
              src={product.images[activeView]}
              alt={`${product.name} - ${activeView} view`}
              className={`object-contain max-h-[300px] w-full transition-all duration-300 ${isZooming ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
            />
            {/* Zooming magnifier overlay */}
            {isZooming && (
              <div
                className="absolute inset-0 bg-white dark:bg-zinc-950 bg-no-repeat bg-contain"
                style={{
                  backgroundImage: `url(${product.images[activeView]})`,
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundSize: '250%',
                }}
              />
            )}
            <span className="absolute bottom-3 right-3 text-[9px] font-bold text-zinc-950 dark:text-zinc-400 uppercase tracking-widest bg-zinc-150/90 dark:bg-zinc-900/90 px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
              Hover to Zoom
            </span>
          </div>

          {/* Thumbnail Selector list */}
          <div className="grid grid-cols-5 gap-3">
            {(Object.keys(product.images) as Array<keyof ProductImages>).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`relative aspect-video border rounded-xl overflow-hidden bg-white dark:bg-zinc-950 p-2 flex items-center justify-center transition-all cursor-pointer ${activeView === view
                  ? 'border-zinc-950 dark:border-white ring-2 ring-zinc-950/10 dark:ring-white/10'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700'
                  }`}
              >
                <img
                  src={product.images[view]}
                  alt={`${product.name} - thumbnail ${view}`}
                  className="object-contain max-h-[40px] w-full"
                />
                <span className="absolute bottom-1 left-0 right-0 text-[8px] font-extrabold text-center text-zinc-850 dark:text-zinc-400 uppercase tracking-wider">
                  {view}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Panel */}
        <div className="flex flex-col">
          <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-800 dark:text-zinc-400 mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-black tracking-tight text-zinc-955 dark:text-zinc-50 mb-3">
            {product.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm font-extrabold text-zinc-950 dark:text-white">
              {product.rating}
            </span>
            <span className="text-xs text-zinc-800 dark:text-zinc-400 font-bold">
              ({localReviews.length} verified reviews)
            </span>
          </div>

          {/* Price display */}
          <div className="mb-6">
            <span className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
              ${product.price.toLocaleString()}
            </span>
            {product.stock > 0 ? (
              <span className="ml-3 text-xs font-bold uppercase tracking-wider text-emerald-605 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="ml-3 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-zinc-900 dark:text-zinc-300 font-medium leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity Selector and Add to Cart Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 p-1 w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={product.stock === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-800 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className="w-12 text-center text-sm font-bold text-zinc-950 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={product.stock === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-zinc-800 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-4.5 px-8 rounded-2xl text-sm font-bold tracking-wide shadow-md transition-all duration-200 cursor-pointer ${product.stock === 0
                ? 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-550 cursor-not-allowed'
                : isAdded
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-zinc-950 text-white dark:text-[#000] hover:bg-zinc-850 dark:bg-zinc-100 dark:text-zinc-955 dark:hover:bg-white hover:shadow-lg'
                }`}
            >
              {product.stock === 0 ? 'Out of Stock' : isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          </div>

          {/* Highlights Mini List */}
          <div className="bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-850 dark:text-zinc-400 mb-3">
              Highlights
            </h3>
            <ul className="space-y-2 text-sm text-zinc-900 dark:text-zinc-300 font-medium">
              {product.highlights.map((h, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="text-zinc-950 dark:text-white font-bold select-none">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Documentation Section */}
      {product.pdfBrochure && (
        <div className="mt-12 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-lg dark:hover:shadow-2xl/10 transition-all duration-300">
          <div className="flex gap-4 items-center text-center sm:text-left flex-col sm:flex-row">
            <div className="p-4 bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-2xl">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h1.5m-1.5 3h4m-4 3h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Product Brochure & Tech Specs</h3>
              <p className="text-sm text-zinc-800 dark:text-zinc-400 mt-1 font-medium max-w-xl">
                Download the official product brochure to review complete technical specifications, AI processing performance, and hardware configurations.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={product.pdfBrochure}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 border border-zinc-300 dark:border-zinc-700 text-zinc-850 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60 font-bold text-sm rounded-2xl transition-colors text-center flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View PDF
            </a>
            <a
              href={product.pdfBrochure}
              download={product.pdfBrochure.split('/').pop()}
              className="w-full sm:w-auto px-6 py-3.5 bg-zinc-950 text-white hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 font-bold text-sm rounded-2xl transition-colors shadow-sm hover:shadow text-center flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex border-b border-zinc-200 dark:border-zinc-850 space-x-6 text-sm font-bold mb-8">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 transition-colors duration-200 border-b-2 relative cursor-pointer ${activeTab === 'specs'
              ? 'border-zinc-950 text-zinc-950 dark:border-white dark:text-white'
              : 'border-transparent text-zinc-700 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300'
              }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors duration-200 border-b-2 relative cursor-pointer ${activeTab === 'reviews'
              ? 'border-zinc-950 text-zinc-955 dark:border-white dark:text-white'
              : 'border-transparent text-zinc-700 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300'
              }`}
          >
            Reviews ({localReviews.length})
          </button>
        </div>

        {activeTab === 'specs' ? (
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl">
            {product.specifications.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-zinc-200 dark:border-zinc-900 text-sm"
              >
                <span className="text-zinc-800 dark:text-zinc-400 font-bold">{spec.name}</span>
                <span className="text-zinc-955 dark:text-zinc-50 font-black text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Left side: Reviews List */}
            <div className="md:col-span-3 space-y-6">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-4">Customer Reviews</h3>
              {localReviews.length === 0 ? (
                <div className="py-12 text-center bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6">
                  <svg className="w-12 h-12 text-zinc-305 dark:text-zinc-700 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-zinc-800 dark:text-zinc-400 font-medium">No reviews yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                  {localReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="border-b border-zinc-200 dark:border-zinc-900 pb-6 last:border-b-0"
                    >
                      {editingId === rev.id ? (
                        <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-400">Editing Rating:</span>
                            <div className="flex gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setEditRating(star)}
                                  onMouseEnter={() => setEditHoverRating(star)}
                                  onMouseLeave={() => setEditHoverRating(null)}
                                  className="text-zinc-300 dark:text-zinc-700 cursor-pointer"
                                >
                                  <svg
                                    className={`w-5 h-5 ${star <= (editHoverRating ?? editRating)
                                      ? 'text-amber-500 fill-amber-500'
                                      : 'text-zinc-300 dark:text-zinc-700'
                                      }`}
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-950 dark:text-white"
                              placeholder="Edit title..."
                            />
                          </div>
                          <div>
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              rows={3}
                              className="w-full px-3 py-1.5 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-950 dark:text-white resize-none"
                              placeholder="Edit details..."
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(rev.id)}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-1.5 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-zinc-955 dark:text-white">{rev.author}</span>
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-500/20">
                                Verified Buyer
                              </span>
                            </div>
                            <span className="text-xs text-zinc-700 dark:text-zinc-500 font-bold">{rev.date}</span>
                          </div>
                          <div className="flex gap-1 mb-2">{renderStars(rev.rating)}</div>
                          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 mb-1">{rev.title}</h4>
                          <p className="text-sm text-zinc-900 dark:text-zinc-300 font-medium leading-relaxed">{rev.content}</p>
                          <div className="flex gap-4 mt-3 text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                            <button
                              onClick={() => startEdit(rev)}
                              className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteReview(rev.id)}
                              className="hover:text-red-600 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Add Review Form */}
            <div className="md:col-span-2 bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl">
              <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-400 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="text-zinc-300 dark:text-zinc-700 hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Rate ${star} stars`}
                      >
                        <svg
                          className={`w-6 h-6 ${star <= (hoverRating ?? formRating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-zinc-300 dark:text-zinc-700'
                            }`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author Name */}
                <div>
                  <label htmlFor="review-author" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="review-author"
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g., Jane Doe"
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-950 dark:text-white placeholder-zinc-800 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Review Title */}
                <div>
                  <label htmlFor="review-title" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-400 mb-1.5">
                    Review Title
                  </label>
                  <input
                    id="review-title"
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Outstanding performance!"
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-950 dark:text-white placeholder-zinc-800 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Review Content */}
                <div>
                  <label htmlFor="review-content" className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-400 mb-1.5">
                    Review Details
                  </label>
                  <textarea
                    id="review-content"
                    required
                    rows={4}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="What did you like or dislike? How does it perform?"
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-950 dark:text-white placeholder-zinc-800 dark:placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-zinc-950 text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

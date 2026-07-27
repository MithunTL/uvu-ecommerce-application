'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';

type CheckoutStep = 'cart' | 'auth' | 'payment' | 'success';

function CartFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get('step') as CheckoutStep | null;

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    taxEstimation,
    cartTotal,
  } = useCart();

  const { user, signIn, signUp, isLoading: authLoading } = useAuth();
  const { placeOrder } = useOrders();

  // States
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoError, setPromoError] = useState('');

  // Auth Inputs
  const [isLoginView, setIsLoginView] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Payment & Shipping Inputs
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Visa' | 'UPI' | 'PayPal'>('Visa');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');

  // Visa Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // UPI details
  const [upiId, setUpiId] = useState('');

  const [paymentError, setPaymentError] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  // Sync step state from URL parameter if available
  useEffect(() => {
    if (stepParam) {
      if (stepParam === 'auth' && user) {
        setStep('payment');
      } else {
        setStep(stepParam);
      }
    } else {
      setStep('cart');
    }
  }, [stepParam, user]);

  // Set default shipping name if user is logged in
  useEffect(() => {
    if (user && !shippingName) {
      setShippingName(user.name);
    }
  }, [user, shippingName]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.toUpperCase() === 'UVU10') {
      const discount = cartSubtotal * 0.1;
      setPromoDiscount(discount);
      setPromoSuccess('Promo code UVU10 applied! 10% discount subtracted.');
    } else if (promoCode.trim() === '') {
      setPromoError('Please enter a promo code.');
    } else {
      setPromoError('Invalid promo code. Try "UVU10".');
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    if (!user) {
      router.push('/cart?step=auth');
    } else {
      router.push('/cart?step=payment');
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (authPassword.length < 4) {
      setAuthError('Password must be at least 4 characters.');
      return;
    }

    try {
      if (isLoginView) {
        await signIn(authEmail, authName);
      } else {
        if (!authName.trim()) {
          setAuthError('Please enter your name.');
          return;
        }
        await signUp(authName, authEmail);
      }
      router.push('/cart?step=payment');
    } catch (err) {
      setAuthError('Authentication failed. Please try again.');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (!shippingName.trim() || !shippingAddress.trim() || !shippingCity.trim() || !shippingZip.trim()) {
      setPaymentError('Please fill out all shipping fields.');
      return;
    }

    if (paymentMethod === 'Visa') {
      if (cardNumber.length < 15 || !cardExpiry.includes('/') || cardCvv.length < 3) {
        setPaymentError('Please enter valid credit card details.');
        return;
      }
    } else if (paymentMethod === 'UPI') {
      if (!upiId.includes('@')) {
        setPaymentError('Please enter a valid UPI ID (e.g. user@bank).');
        return;
      }
    }

    setIsProcessingOrder(true);
    setTimeout(() => {
      const orderId = placeOrder(
        cartItems,
        cartSubtotal,
        taxEstimation,
        promoDiscount,
        cartTotal - promoDiscount,
        paymentMethod
      );
      setCreatedOrderId(orderId);
      clearCart();
      setIsProcessingOrder(false);
      router.push('/cart?step=success');
    }, 2000);
  };

  const finalTotal = cartTotal - promoDiscount;

  // Render Step 1: Cart Items Review
  if (step === 'cart') {
    return (
      <div className="flex-1 flex flex-col justify-start">
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center max-w-2xl mx-auto w-full my-8 p-6">
            <svg className="w-16 h-16 text-zinc-800 dark:text-zinc-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Your cart is empty</h2>
            <p className="text-sm text-zinc-800 dark:text-zinc-400 mt-2 max-w-sm">
              Explore our catalog of premium computers and custom-tuned accessories.
            </p>
            <Link
              href="/accessories"
              className="mt-8 px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black font-semibold text-xs transition-colors hover:bg-zinc-850"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl hover:border-zinc-350 dark:hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 bg-white dark:bg-zinc-950 p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                      <img src={item.image} alt={item.name} className="object-contain max-h-16 w-full" />
                    </div>
                    <div className="min-w-0 flex-1 sm:max-w-xs">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-800 dark:text-zinc-450">{item.category}</span>
                      <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white truncate">
                        <Link href={`/product/${item.id}`} className="hover:underline">{item.name}</Link>
                      </h3>
                      <span className="text-sm text-zinc-900 dark:text-zinc-300 mt-1 block font-semibold">${item.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-950 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                      >
                        –
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-zinc-950 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white w-20 text-right">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-zinc-700 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800 hover:text-red-650 dark:hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={clearCart}
                  className="text-xs font-extrabold text-zinc-800 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Clear Cart
                </button>
                <Link href="/accessories" className="text-xs font-bold text-zinc-950 dark:text-white hover:underline uppercase tracking-wider">
                  ← Keep Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl">
              <h2 className="text-lg font-bold text-[#00] dark:text-[#fff] mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between">
                  <span className="text-zinc-700 dark:text-zinc-400 font-semibold">Subtotal</span>
                  <span className="font-bold text-zinc-950 dark:text-white">${cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-700 dark:text-zinc-400 font-semibold">Estimated Shipping</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-500">Free</span>
                </div>
                {/* Sales Tax is not charged or displayed since UVU is a tax-exempt government university */}
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-500 font-bold">
                    <span>Discount (10%)</span>
                    <span>-${promoDiscount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Promo box */}
              <form onSubmit={handleApplyPromo} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE (UVU10)"
                    className="flex-1 px-3.5 py-2 text-xs font-bold rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white focus:outline-none uppercase"
                  />
                  <button type="submit" className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-xs font-bold tracking-wide cursor-pointer">
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-650 text-[10px] font-bold mt-1.5">{promoError}</p>}
                {promoSuccess && <p className="text-emerald-650 dark:text-emerald-500 text-[10px] font-bold mt-1.5">{promoSuccess}</p>}
              </form>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-base font-bold text-zinc-955 dark:text-zinc-300">Total</span>
                <span className="text-2xl font-black text-zinc-950 dark:text-white">${finalTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-2xl bg-zinc-955 hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-[#000] font-bold text-sm tracking-wide shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render Step 2: Sign In Flow (Apple ID Inspired Minimal Card)
  if (step === 'auth') {
    return (
      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-lg">
          <div className="text-center mb-8">
            <span className="text-xl font-bold bg-gradient-to-r from-zinc-950 to-zinc-700 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">UVU ID</span>
            <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white mt-2">
              {isLoginView ? 'Sign in with your UVU ID' : 'Create your UVU ID'}
            </h2>
            <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-2 font-medium">
              {isLoginView ? 'One account to manage purchases and tracking.' : 'Get started to track order logs and returns.'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="Steve Wozniak"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="steve@apple.com"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            {authError && <p className="text-red-650 text-xs font-bold">{authError}</p>}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-zinc-800 dark:border-white border-t-transparent animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : isLoginView ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs">
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
                setAuthError('');
              }}
              className="text-zinc-800 dark:text-zinc-300 font-extrabold hover:underline cursor-pointer"
            >
              {isLoginView ? "Don't have a UVU ID? Create one now" : 'Already have a UVU ID? Sign in'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Step 3: Shipping & Payment Method Selection (Visa, UPI, PayPal, COD)
  if (step === 'payment') {
    return (
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Form Panel */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
          {/* Shipping Details */}
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  placeholder="Steve Wozniak"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="1 Infinite Loop"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-955 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    placeholder="Cupertino"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-955 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">Zip Code</label>
                  <input
                    type="text"
                    required
                    value={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    placeholder="95014"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-955 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-zinc-950 dark:text-white mb-4">Select Payment Method</h2>

            {/* Options Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { id: 'Visa', name: 'Credit Card (Visa)' },
                { id: 'UPI', name: 'UPI Pay' },
                { id: 'PayPal', name: 'PayPal' },
                { id: 'COD', name: 'COD (Cash)' },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method.id as any);
                    setPaymentError('');
                  }}
                  className={`px-3 py-3.5 border rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${paymentMethod === method.id
                    ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-black shadow'
                    : 'border-zinc-300 bg-white text-zinc-800 dark:border-zinc-850 dark:bg-zinc-950 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-700'
                    }`}
                >
                  {method.name}
                </button>
              ))}
            </div>

            {/* Conditional inputs */}
            <div className="border-t border-zinc-250 dark:border-zinc-800 pt-4">
              {paymentMethod === 'Visa' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">Card Number</label>
                    <input
                      type="text"
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="4111 2222 3333 4444"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-955 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-955 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'UPI' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">UPI Address ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="stevejobs@okhdfcbank"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-955 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                    <p className="text-[10px] text-zinc-700 dark:text-zinc-400 mt-1.5 font-bold">Provide valid UPI identifier to authorize payments.</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'PayPal' && (
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-300 animate-fadeIn">
                  Redirecting to the **PayPal Secure Portal** upon clicking &quot;Pay &amp; Place Order&quot;.
                </div>
              )}

              {paymentMethod === 'COD' && (
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-xs text-zinc-800 dark:text-zinc-300 space-y-1.5 animate-fadeIn">
                  <p className="font-bold text-zinc-950 dark:text-white">Cash on Delivery (COD) Activated</p>
                  <p className="font-medium">Please keep exact amount ready when delivery agent arrives with your technology packages.</p>
                </div>
              )}
            </div>
          </div>

          {paymentError && <p className="text-red-650 text-xs font-bold">{paymentError}</p>}
        </form>

        {/* Right side Invoice detail panel */}
        <div className="lg:col-span-1 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl">
          <h2 className="text-lg font-bold text-[#000] dark:text-white mb-6">Review Totals</h2>
          <div className="space-y-4 text-sm mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between">
              <span className="text-zinc-700 dark:text-zinc-400 font-semibold">Subtotal</span>
              <span className="font-bold text-zinc-950 dark:text-white">${cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-700 dark:text-zinc-400 font-semibold">Shipping</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-500">Free</span>
            </div>
            {/* Sales Tax is not charged or displayed since UVU is a tax-exempt government university */}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-500 font-bold">
                <span>Discount (10%)</span>
                <span>-${promoDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-4 border-t border-zinc-250 dark:border-zinc-800 text-base font-bold text-zinc-950 dark:text-white">
              <span>Order Total</span>
              <span className="text-xl font-black">${finalTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessingOrder}
            className="w-full py-4 rounded-2xl bg-zinc-955 hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-[#000] font-bold text-sm tracking-wide shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessingOrder ? (
              <>
                <div className="w-4 h-4 rounded-full border border-current border-t-transparent animate-spin" />
                <span>Authorizing Payment...</span>
              </>
            ) : (
              `Pay & Place Order`
            )}
          </button>
        </div>
      </div>
    );
  }

  // Render Step 4: Success / Thank you message redirecting to Tracking
  if (step === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white mb-2">Order Confirmed!</h2>
        <p className="text-sm text-zinc-800 dark:text-zinc-450 mb-6 font-medium">
          Thank you for choosing UVU Computer Shop. We have registered your purchase logs under your profile.
        </p>

        <div className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl mb-8 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-800 dark:text-zinc-400 font-semibold">Order ID:</span>
            <span className="font-extrabold text-zinc-950 dark:text-white">{createdOrderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-800 dark:text-zinc-400 font-semibold">Payment Status:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-500">Verified</span>
          </div>
          <div className="flex justify-between text-sm border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="text-zinc-800 dark:text-zinc-400 font-semibold">Tracking Status:</span>
            <span className="font-extrabold text-zinc-950 dark:text-white uppercase">Processing</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/orders"
            className="px-6 py-3 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black hover:bg-zinc-850 dark:hover:bg-zinc-100 font-bold text-sm transition-colors shadow"
          >
            Track Order Progress
          </Link>
          <Link
            href="/accessories"
            className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-300 transition-colors"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 flex items-center justify-center min-h-[50vh] bg-white dark:bg-black transition-colors duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-2 border-zinc-950 dark:border-white border-t-transparent animate-spin" />
            <span className="text-sm text-zinc-800 dark:text-zinc-400 font-bold font-sans">Syncing order state...</span>
          </div>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start">
        <CartFlow />
      </div>
    </Suspense>
  );
}

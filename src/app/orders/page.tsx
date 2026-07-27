'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useOrders, Order } from '@/context/OrderContext';

export default function OrdersPage() {
  const { user, signIn } = useAuth();
  const { orders, cancelOrder, returnOrder, advanceOrderStatus } = useOrders();

  // Selected Order for viewing details
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Return dialog states have been removed as returns and refunds are no longer accepted.

  // Login inputs if not logged in
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!emailInput.includes('@')) {
      setAuthError('Please enter a valid email.');
      return;
    }
    setAuthLoading(true);
    await signIn(emailInput);
    setAuthLoading(false);
  };

  const handleCancelClick = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  // Return request functions have been removed due to the strict no-refunds policy.

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Processing':
        return <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 rounded-full border border-amber-500/20 dark:text-amber-400">Processing</span>;
      case 'Shipped':
        return <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-500/10 rounded-full border border-blue-500/20 dark:text-blue-400">Shipped</span>;
      case 'Delivered':
        return <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-605 bg-emerald-500/10 rounded-full border border-emerald-500/20 dark:text-emerald-400">Delivered</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-zinc-950 bg-zinc-100 rounded-full border border-zinc-300 dark:text-zinc-400 dark:bg-zinc-900 dark:border-zinc-800">Cancelled</span>;
      case 'Returned':
        // Returned status is kept for backward compatibility with historical orders, but no refunds/returns are accepted now.
        return <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-red-650 bg-red-500/10 rounded-full border border-red-500/20 dark:text-red-400">Returned</span>;
    }
  };

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Auth Wall
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex-1 flex flex-col items-center justify-center bg-white dark:bg-black transition-colors duration-300">
        <div className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-white">Sign in to track orders</h2>
            <p className="text-xs text-zinc-805 dark:text-zinc-400 mt-2 font-semibold">
              {/* Reference to returns/refunds removed because no refunds/returns are accepted. */}
              Track delivery status timelines for past orders.
            </p>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="steve@apple.com"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-400 uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-955 text-zinc-955 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
              />
            </div>
            {authError && <p className="text-red-650 text-xs font-bold">{authError}</p>}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {authLoading ? (
                <div className="w-4 h-4 rounded-full border border-current border-t-transparent animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col bg-white dark:bg-black transition-colors duration-300">
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-white">Purchase History</h1>
          <p className="text-sm text-zinc-855 dark:text-zinc-300 mt-2 font-semibold">
            {/* Reference to refund requests removed because no refunds/returns are accepted. */}
            Manage your placed orders and track real-time shipping logs.
          </p>
        </div>
        <span className="text-xs text-zinc-855 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 px-3.5 py-1.5 rounded-full font-bold select-none uppercase tracking-wide border border-zinc-250 dark:border-zinc-800">
          User: {user.name} ({user.email})
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-905 border border-dashed border-zinc-250 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center max-w-2xl mx-auto w-full my-8 p-6">
          <svg className="w-16 h-16 text-zinc-800 dark:text-zinc-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h2 className="text-xl font-bold text-zinc-950 dark:text-white">No orders found</h2>
          <p className="text-sm text-zinc-805 dark:text-zinc-300 mt-2 max-w-sm font-medium">
            You haven&apos;t placed any orders yet on this account.
          </p>
          <Link
            href="/accessories"
            className="mt-8 px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black font-bold text-xs transition-colors hover:bg-zinc-850"
          >
            Explore Tech Products
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Orders History List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xs font-bold text-zinc-800 dark:text-zinc-450 uppercase tracking-wider mb-2">Select Order</h2>
            <div className="space-y-3">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`w-full text-left p-5 border rounded-2xl transition-all cursor-pointer ${(selectedOrderId === order.id || (!selectedOrderId && selectedOrder?.id === order.id))
                    ? 'border-zinc-950 bg-zinc-50 dark:border-white dark:bg-zinc-900 shadow'
                    : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 hover:border-zinc-350 dark:hover:border-zinc-700'
                    }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-extrabold text-zinc-950 dark:text-white">{order.id}</span>
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-400">{order.createdAt}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-700 dark:text-zinc-400">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                      <p className="text-sm font-bold text-zinc-950 dark:text-white">${order.total.toLocaleString()}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Order details & interactive status tracker */}
          <div className="lg:col-span-2">
            {selectedOrder && (
              <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl space-y-8">
                {/* ID & simulation bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-950 dark:text-white">Order {selectedOrder.id} Details</h2>
                    <p className="text-xs text-zinc-800 dark:text-zinc-400 mt-1.5 font-semibold">Placed on {selectedOrder.createdAt} • Paid via {selectedOrder.paymentMethod}</p>
                  </div>
                  {['Processing', 'Shipped'].includes(selectedOrder.status) && (
                    <button
                      onClick={() => advanceOrderStatus(selectedOrder.id)}
                      className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                      title="Advance tracking state for test logs"
                    >
                      Simulate Next Status Step →
                    </button>
                  )}
                </div>

                {/* Tracking Progress Timeline */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-450 uppercase tracking-wider">Tracking Timeline</h3>

                  <div className="relative flex justify-between items-start w-full px-4 pt-4 pb-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden">
                    {selectedOrder.status === 'Cancelled' ? (
                      <div className="text-center py-6 w-full text-zinc-800 dark:text-zinc-300 font-bold text-sm flex flex-col items-center justify-center gap-2">
                        <svg className="w-10 h-10 text-zinc-400 dark:text-zinc-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>This order was cancelled. No tracking available.</span>
                      </div>
                    ) : (
                      <>
                        {/* Connecting Line */}
                        <div className="absolute top-8 left-[10%] right-[10%] h-1 bg-zinc-200 dark:bg-zinc-800 z-0">
                          <div
                            className="h-full bg-zinc-955 dark:bg-white transition-all duration-500"
                            style={{
                              width:
                                selectedOrder.status === 'Processing'
                                  ? '0%'
                                  : selectedOrder.status === 'Shipped'
                                    ? '50%'
                                    : selectedOrder.status === 'Delivered' || selectedOrder.status === 'Returned'
                                      ? '100%'
                                      : '0%',
                            }}
                          />
                        </div>

                        {/* Step 1: Placed */}
                        <div className="flex flex-col items-center relative z-10 flex-1">
                          <div className="w-8 h-8 rounded-full bg-zinc-955 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs">
                            ✓
                          </div>
                          <span className="text-[10px] font-bold text-zinc-955 dark:text-white mt-2 text-center uppercase tracking-wide">Placed</span>
                        </div>

                        {/* Step 2: Processing */}
                        <div className="flex flex-col items-center relative z-10 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${['Processing', 'Shipped', 'Delivered', 'Returned'].includes(selectedOrder.status)
                            ? 'bg-zinc-955 dark:bg-white text-white dark:text-black border-zinc-955 dark:border-white'
                            : 'bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                            }`}>
                            {['Shipped', 'Delivered', 'Returned'].includes(selectedOrder.status) ? '✓' : '●'}
                          </div>
                          <span className="text-[10px] font-bold mt-2 text-center uppercase tracking-wide text-zinc-955 dark:text-white">Processing</span>
                        </div>

                        {/* Step 3: Shipped */}
                        <div className="flex flex-col items-center relative z-10 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${['Shipped', 'Delivered', 'Returned'].includes(selectedOrder.status)
                            ? 'bg-zinc-955 dark:bg-white text-white dark:text-black border-zinc-955 dark:border-white'
                            : 'bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                            }`}>
                            {['Delivered', 'Returned'].includes(selectedOrder.status) ? '✓' : '●'}
                          </div>
                          <span className={`text-[10px] font-bold mt-2 text-center uppercase tracking-wide ${['Shipped', 'Delivered', 'Returned'].includes(selectedOrder.status) ? 'text-zinc-955 dark:text-white' : 'text-zinc-500'
                            }`}>Shipped</span>
                        </div>

                        {/* Step 4: Delivered */}
                        <div className="flex flex-col items-center relative z-10 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${['Delivered', 'Returned'].includes(selectedOrder.status)
                            ? 'bg-zinc-955 dark:bg-white text-white dark:text-black border-zinc-955 dark:border-white'
                            : 'bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                            }`}>
                            {['Returned'].includes(selectedOrder.status) ? '↺' : '●'}
                          </div>
                          <span className={`text-[10px] font-bold mt-2 text-center uppercase tracking-wide ${['Delivered', 'Returned'].includes(selectedOrder.status) ? 'text-zinc-955 dark:text-white' : 'text-zinc-500'
                            }`}>
                            {selectedOrder.status === 'Returned' ? 'Returned' : 'Delivered'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Items Bought List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-450 uppercase tracking-wider">Items in Order</h3>
                  <div className="space-y-2.5">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-white dark:bg-zinc-950 p-3 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                        <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-xl overflow-hidden p-1 flex items-center justify-center flex-shrink-0">
                          <img src={item.image} alt={item.name} className="object-contain max-h-10" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-zinc-950 dark:text-white truncate">{item.name}</h4>
                          <span className="text-[10px] text-zinc-700 dark:text-zinc-400 font-semibold">Qty: {item.quantity} • ${item.price.toLocaleString()} each</span>
                        </div>
                        <span className="text-xs font-extrabold text-zinc-900 dark:text-white">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Return state info for legacy orders (refund details removed since refunds/returns are no longer accepted) */}
                {selectedOrder.status === 'Returned' && (
                  <div className="bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-900 p-4 rounded-2xl text-xs space-y-1 text-red-800 dark:text-red-300">
                    <p className="font-bold uppercase tracking-wider">Return Summary</p>
                    <p className="font-semibold">Reason: &quot;{selectedOrder.returnReason}&quot;</p>
                    <p className="font-medium mt-1">This order has been returned. (New returns and refunds are no longer accepted).</p>
                  </div>
                )}

                {/* Financial invoice breakdown */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5 space-y-2 text-sm max-w-xs ml-auto">
                  <div className="flex justify-between text-zinc-700 dark:text-zinc-400 font-medium">
                    <span>Subtotal:</span>
                    <span className="font-bold text-zinc-950 dark:text-white">${selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {/* <div className="flex justify-between text-zinc-700 dark:text-zinc-400 font-medium">
                    <span>Tax (8%):</span>
                    <span className="font-bold text-zinc-950 dark:text-white">${selectedOrder.tax.toLocaleString()}</span>
                  </div> */}
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-500 font-bold">
                      <span>Promo Discount:</span>
                      <span>-${selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-zinc-950 dark:text-white border-t border-zinc-200 dark:border-zinc-800 pt-2">
                    <span>Paid Total:</span>
                    <span>${selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Order Action Buttons */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-200 dark:border-zinc-800">
                  {selectedOrder.status === 'Processing' && (
                    <button
                      onClick={() => handleCancelClick(selectedOrder.id)}
                      className="px-5 py-2.5 rounded-full border border-red-200 text-red-600 bg-red-500/5 hover:bg-red-500/10 hover:border-red-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  )}

                  {/* Request Return & Refund button has been removed since refunds and returns are not allowed */}
                </div>
              </div>
            )}
            {/* Return Dialog Modal is removed because returns/refunds are no longer accepted */}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  // tax is kept for backward compatibility with existing order structures but will always be 0.
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  // status 'Returned' is kept for backward compatibility with existing orders, although new refunds/returns are disabled.
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
  createdAt: string;
  returnReason?: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    subtotal: number,
    tax: number, // will always be 0
    discount: number,
    total: number,
    paymentMethod: string
  ) => string;
  cancelOrder: (orderId: string) => void;
  // returnOrder is deprecated/disabled as returns and refunds are no longer allowed.
  returnOrder: (orderId: string, reason: string) => void;
  advanceOrderStatus: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('uvu_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('uvu_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage:', e);
    }
  }, [orders, isLoaded]);

  const placeOrder = (
    items: CartItem[],
    subtotal: number,
    tax: number,
    discount: number,
    total: number,
    paymentMethod: string
  ): string => {
    const orderId = `UVU-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      status: 'Processing',
      createdAt: new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    return orderId;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: 'Cancelled' as const } : order
      )
    );
  };

  // returnOrder is deprecated and disabled because UVU has a strict no-refunds/no-returns policy.
  // It is kept here only to avoid breaking the OrderContextType signature.
  const returnOrder = (orderId: string, reason: string) => {
    console.warn(`returnOrder was called for orderId: ${orderId} but returns and refunds are disabled.`);
  };

  // Status transitions: Processing -> Shipped -> Delivered
  const advanceOrderStatus = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;
        let nextStatus = order.status;
        if (order.status === 'Processing') {
          nextStatus = 'Shipped';
        } else if (order.status === 'Shipped') {
          nextStatus = 'Delivered';
        }
        return { ...order, status: nextStatus };
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        cancelOrder,
        returnOrder,
        advanceOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

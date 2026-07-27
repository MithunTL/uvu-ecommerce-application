'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, name?: string) => Promise<boolean>;
  signUp: (name: string, email: string) => Promise<boolean>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('uvu_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load user from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, name?: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newUser = {
      name: name || email.split('@')[0],
      email: email,
    };
    
    setUser(newUser);
    try {
      localStorage.setItem('uvu_user', JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to save user to localStorage:', e);
    }
    setIsLoading(false);
    return true;
  };

  const signUp = async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newUser = { name, email };
    setUser(newUser);
    try {
      localStorage.setItem('uvu_user', JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to save user to localStorage:', e);
    }
    setIsLoading(false);
    return true;
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('uvu_user');
    } catch (e) {
      console.error('Failed to remove user from localStorage:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

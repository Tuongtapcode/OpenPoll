'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { getMeTrigger } from '@/features/auth/store/auth-slice';
import Header from './header';
import Footer from './footer';
import { Toaster } from 'react-hot-toast';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  // Auto-fetch user on app load if token exists
  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(getMeTrigger());
    }
  }, [token, isAuthenticated, dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
          },
        }}
      />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

'use client';

import React from 'react';

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeStyles = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeStyles[size]} animate-spin rounded-full border-2 border-white/20 border-t-indigo-500`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-white/10 border-t-indigo-500" />
          <div className="absolute inset-0 h-16 w-16 mx-auto animate-ping rounded-full border-4 border-indigo-500/20" />
        </div>
        <p className="text-gray-400 animate-pulse">Đang tải...</p>
      </div>
    </div>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/5 ${className}`}
    />
  );
}

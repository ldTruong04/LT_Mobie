import React from 'react';
import { BookstoreProvider } from '../hooks/useBookstore';
import { CartProvider } from './cart';
import { AuthProvider } from './auth';
import { WishlistProvider } from './wishlist';

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <BookstoreProvider>{children}</BookstoreProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
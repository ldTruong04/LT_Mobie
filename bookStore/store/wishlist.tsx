import React, { createContext, useContext, useMemo, useState } from 'react';

type WishlistContextValue = {
  bookIds: number[];
  totalCount: number;
  hasBook: (bookId: number) => boolean;
  addBook: (bookId: number) => void;
  removeBook: (bookId: number) => void;
  toggleBook: (bookId: number) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [bookIds, setBookIds] = useState<number[]>([]);

  const value = useMemo<WishlistContextValue>(
    () => ({
      bookIds,
      totalCount: bookIds.length,
      hasBook: (bookId) => bookIds.includes(bookId),
      addBook: (bookId) =>
        setBookIds((current) => (current.includes(bookId) ? current : [...current, bookId])),
      removeBook: (bookId) => setBookIds((current) => current.filter((id) => id !== bookId)),
      toggleBook: (bookId) =>
        setBookIds((current) =>
          current.includes(bookId) ? current.filter((id) => id !== bookId) : [...current, bookId],
        ),
      clearWishlist: () => setBookIds([]),
    }),
    [bookIds],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}
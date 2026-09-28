import React, { createContext, useContext, useMemo, useState } from 'react';
import { BOOKS, Book, filterBooks } from '../lib/constants';

type BookstoreContextValue = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  getBookById: (bookId: number) => Book | undefined;
  getBooksByCategory: (category: string) => Book[];
};

const BookstoreContext = createContext<BookstoreContextValue | undefined>(undefined);

export function BookstoreProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const value = useMemo<BookstoreContextValue>(
    () => ({
      selectedCategory,
      setSelectedCategory,
      getBookById: (bookId: number) => BOOKS.find((book) => book.id === bookId),
      getBooksByCategory: (category: string) => filterBooks(category),
    }),
    [selectedCategory],
  );

  return <BookstoreContext.Provider value={value}>{children}</BookstoreContext.Provider>;
}

export function useBookstore() {
  const context = useContext(BookstoreContext);

  if (!context) {
    throw new Error('useBookstore must be used within a BookstoreProvider');
  }

  return context;
}
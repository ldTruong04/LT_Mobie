import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { BOOKS, Book } from '../lib/constants';

export type CartLine = {
  bookId: number;
  quantity: number;
};

type CartEntry = {
  book: Book;
  quantity: number;
};

type CartState = {
  items: CartLine[];
};

type CartContextValue = {
  items: CartLine[];
  cartEntries: CartEntry[];
  addItem: (bookId: number, quantity?: number) => void;
  removeItem: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  changeQuantity: (bookId: number, delta: number) => void;
  clearCart: () => void;
  getQuantity: (bookId: number) => number;
  totalQuantity: number;
  totalPrice: number;
};

type CartAction =
  | { type: 'add'; bookId: number; quantity: number }
  | { type: 'remove'; bookId: number }
  | { type: 'updateQuantity'; bookId: number; quantity: number }
  | { type: 'clear' };

const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialState: CartState = { items: [] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const current = state.items.find((item) => item.bookId === action.bookId);

      if (!current) {
        return { items: [...state.items, { bookId: action.bookId, quantity: action.quantity }] };
      }

      return {
        items: state.items.map((item) =>
          item.bookId === action.bookId
            ? { ...item, quantity: item.quantity + action.quantity }
            : item,
        ),
      };
    }
    case 'remove':
      return { items: state.items.filter((item) => item.bookId !== action.bookId) };
    case 'updateQuantity': {
      if (action.quantity <= 0) {
        return { items: state.items.filter((item) => item.bookId !== action.bookId) };
      }

      const current = state.items.some((item) => item.bookId === action.bookId);
      if (!current) {
        return { items: [...state.items, { bookId: action.bookId, quantity: action.quantity }] };
      }

      return {
        items: state.items.map((item) =>
          item.bookId === action.bookId ? { ...item, quantity: action.quantity } : item,
        ),
      };
    }
    case 'clear':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const items = state.items;

  const cartEntries = useMemo(
    () =>
      items
        .map((item) => {
          const book = BOOKS.find((candidate) => candidate.id === item.bookId);
          return book ? { book, quantity: item.quantity } : null;
        })
        .filter((entry): entry is CartEntry => Boolean(entry)),
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      cartEntries.reduce((total, entry) => {
        return total + entry.book.price * entry.quantity;
      }, 0),
    [cartEntries],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      cartEntries,
      addItem: (bookId, quantity = 1) => dispatch({ type: 'add', bookId, quantity }),
      removeItem: (bookId) => dispatch({ type: 'remove', bookId }),
      updateQuantity: (bookId, quantity) => dispatch({ type: 'updateQuantity', bookId, quantity }),
      changeQuantity: (bookId, delta) => {
        const currentQuantity = items.find((item) => item.bookId === bookId)?.quantity ?? 0;
        dispatch({ type: 'updateQuantity', bookId, quantity: currentQuantity + delta });
      },
      clearCart: () => dispatch({ type: 'clear' }),
      getQuantity: (bookId) => items.find((item) => item.bookId === bookId)?.quantity ?? 0,
      totalQuantity,
      totalPrice,
    }),
    [cartEntries, items, totalPrice, totalQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
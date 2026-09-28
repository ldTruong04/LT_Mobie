import React, { memo, useCallback } from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book, COLORS, money } from '../lib/constants';

type CartItemProps = {
  book: Book;
  quantity: number;
  onChange: (id: number, delta: number) => void;
};

function CartItem({ book, quantity, onChange }: CartItemProps) {
  const decrease = useCallback(() => onChange(book.id, -1), [book.id, onChange]);
  const increase = useCallback(() => onChange(book.id, 1), [book.id, onChange]);

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: book.image }} style={styles.cartImage} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartTitle} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.cartAuthor}>{book.author}</Text>
        <Text style={styles.cartPrice}>{money(book.price)}</Text>
      </View>
      <View style={styles.quantityBox}>
        <Pressable onPress={decrease} style={styles.quantityButton} hitSlop={6}>
          <Ionicons name="remove" size={16} color={COLORS.navy} />
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable onPress={increase} style={styles.quantityButton} hitSlop={6}>
          <Ionicons name="add" size={16} color={COLORS.navy} />
        </Pressable>
      </View>
    </View>
  );
}

export default memo(CartItem);

const styles = StyleSheet.create({
  cartItem: {
    minHeight: 118,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartImage: { width: 58, height: 88, borderRadius: 7, backgroundColor: '#E2E8F0' },
  cartInfo: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 11,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  cartTitle: { color: COLORS.text, fontSize: 15, fontWeight: '800', lineHeight: 19 },
  cartAuthor: { color: COLORS.muted, fontSize: 12 },
  cartPrice: { color: COLORS.red, fontWeight: '800' },
  quantityBox: { width: 78, alignItems: 'center', gap: 5 },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#C7D2FE',
    width: 25,
    height: 25,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pale,
  },
  quantity: { color: COLORS.text, fontSize: 15, fontWeight: '800' },
});

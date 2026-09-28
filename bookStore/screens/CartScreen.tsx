import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import { Book, COLORS, money } from '../lib/constants';

type CartScreenProps = {
  items: Book[];
  cart: Record<number, number>;
  total: number;
  onChangeQuantity: (id: number, delta: number) => void;
  onCheckout: () => void;
};

export default function CartScreen({
  items,
  cart,
  total,
  onChangeQuantity,
  onCheckout,
}: CartScreenProps) {
  return (
    <View style={styles.screen}>
      <Header title="Giỏ hàng" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cart-outline" size={54} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
            <Text style={styles.emptyText}>Hãy thêm vài cuốn sách bạn yêu thích nhé.</Text>
          </View>
        ) : (
          items.map((book) => (
            <CartItem
              key={book.id}
              book={book}
              quantity={cart[book.id]}
              onChange={onChangeQuantity}
            />
          ))
        )}
      </ScrollView>
      <View style={styles.checkoutBar}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalPrice}>{money(total)}</Text>
        </View>
        <Pressable style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 16, gap: 12 },
  checkoutBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: COLORS.line,
    padding: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11,
  },
  totalLabel: { color: COLORS.text, fontSize: 16, fontWeight: '700' },
  totalPrice: { color: COLORS.red, fontSize: 21, fontWeight: '800' },
  checkoutButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.indigo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  checkoutText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 90 },
  emptyTitle: { marginTop: 12, color: COLORS.text, fontSize: 19, fontWeight: '800' },
  emptyText: { marginTop: 6, color: COLORS.muted, fontSize: 14, textAlign: 'center' },
});

import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = { indigo: '#4F46E5', red: '#E85D4A', background: '#F8FAFC' };

export default function FloatingCart({ count, onPress }: any) {
  return (
    <Pressable style={styles.floatingCart} onPress={onPress}>
      <Ionicons name="cart" size={27} color="#fff" />
      {count > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingCart: {
    position: 'absolute',
    right: 20,
    bottom: 22,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.indigo,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#0F172A',
    shadowOpacity: 0.24,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  cartBadge: {
    position: 'absolute',
    right: -3,
    top: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  cartBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
});

import React, { memo } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../lib/constants';

type FloatingCartProps = {
  count: number;
  onPress: () => void;
};

function FloatingCart({ count, onPress }: FloatingCartProps) {
  return (
    <Pressable style={styles.floatingCart} onPress={onPress}>
      <Ionicons name="cart" size={27} color="#fff" />
      {count > 0 ? (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export default memo(FloatingCart);

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

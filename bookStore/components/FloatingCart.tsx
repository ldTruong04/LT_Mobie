import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FloatingCart({ count, onPress, styles }: any) {
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

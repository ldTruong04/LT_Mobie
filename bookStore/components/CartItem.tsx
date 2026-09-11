import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartItem({ book, quantity, onChange, styles, money }: any) {
  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: book.image }} style={styles.cartImage} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.cartAuthor}>{book.author}</Text>
        <Text style={styles.cartPrice}>{money(book.price)}</Text>
      </View>
      <View style={styles.quantityBox}>
        <Pressable onPress={() => onChange(book.id, -1)} style={styles.quantityButton}><Ionicons name="remove" size={16} color={styles ? '#172554' : '#000'} /></Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable onPress={() => onChange(book.id, 1)} style={styles.quantityButton}><Ionicons name="add" size={16} color={styles ? '#172554' : '#000'} /></Pressable>
      </View>
    </View>
  );
}

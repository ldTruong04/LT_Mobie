import React from 'react';
import { View, Pressable, Image, Text, StyleSheet } from 'react-native';
import Badge from './Badge';

const COLORS = { text: '#172033', muted: '#6B7280', red: '#E85D4A' };

export default function BookGrid({ books, onPress, money }: any) {
  return (
    <View style={styles.grid}>
      {books.map((book: any) => (
        <Pressable key={book.id} style={styles.bookCard} onPress={() => onPress(book)}>
          <View style={styles.coverWrap}>
            <Image source={{ uri: book.image }} style={styles.cover} />
            {book.discount && <Badge label={book.discount} />}
          </View>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
          <Text style={styles.bookPrice}>{money(book.price)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 20 },
  bookCard: { width: '48%' },
  coverWrap: {
    position: 'relative',
    width: '100%',
    aspectRatio: 0.72,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  cover: { width: '100%', height: '100%' },
  bookTitle: {
    marginTop: 9,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    minHeight: 40,
  },
  bookAuthor: { marginTop: 3, color: COLORS.muted, fontSize: 12 },
  bookPrice: { marginTop: 6, color: COLORS.red, fontSize: 15, fontWeight: '800' },
});

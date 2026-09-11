import React from 'react';
import { View, Pressable, Image, Text } from 'react-native';
import Badge from './Badge';

export default function BookGrid({ books, onPress, styles, money }: any) {
  return (
    <View style={styles.grid}>
      {books.map((book: any) => (
        <Pressable key={book.id} style={styles.bookCard} onPress={() => onPress(book)}>
          <View style={styles.coverWrap}>
            <Image source={{ uri: book.image }} style={styles.cover} />
            {book.discount && <Badge label={book.discount} styles={styles} />}
          </View>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.bookAuthor} numberOfLines={1}>{book.author}</Text>
          <Text style={styles.bookPrice}>{money(book.price)}</Text>
        </Pressable>
      ))}
    </View>
  );
}
